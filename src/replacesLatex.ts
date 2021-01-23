import {LatexPalavrasChaves} from './LatexPalavrasChaves';

const CONTRA_BARRA = String.fromCharCode(92);
/**
 * A API do Google Translator não reconhece Latex e, logo, acaba retornando
 * um texto traduzido que corrompe o Latex original. Para retransformá-lo em
 * um Latext válido, algumas substituições são realizadas para tentar se
 * aproximar deste resultado
 *
 * @param texto Texto traduzido retornado pela API do Google Translator
 */
export function replacesLatex(texto: string) {
    let retorno = texto;
    const substituicoes = LatexPalavrasChaves.pre_chaves
        .map((k) => {
            return {
                de: CONTRA_BARRA.concat(` ${k} {`),
                para: CONTRA_BARRA.concat(k, '{'),
            };
        })
        .concat(
            LatexPalavrasChaves.pre_colchetes.map((k) => {
                return {
                    de: `${CONTRA_BARRA} ${k} [`,
                    para: `${CONTRA_BARRA}${k}[`,
                };
            }),
        )
        .concat(
            LatexPalavrasChaves.simples.map((k) => {
                return {
                    de: `${CONTRA_BARRA} ${k}`,
                    para: `${CONTRA_BARRA}${k}`,
                };
            }),
        );

    substituicoes.push({de: '&#39;', para: "'"});
    substituicoes.push({de: '`` ', para: '``'});
    substituicoes.push({de: `${CONTRA_BARRA}textit{blockchain}`, para: 'blockchain'});
    substituicoes.push({de: `${CONTRA_BARRA}textit{framework}`, para: 'framework'});
    substituicoes.push({de: `${CONTRA_BARRA}textit{token}`, para: 'token'});

    for (const s of substituicoes) {
        retorno = replaces(retorno, s);
    }
    return retorno;
}

function replaces(texto: string, substituicao: {de: string; para: string}) {
    let retorno = texto;
    const regex = geraRegExpTextoSimples(substituicao.de, 'gm');
    let m: RegExpExecArray | null;

    while ((m = regex.exec(retorno)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        retorno = retorno.replace(regex, substituicao.para);
    }
    return retorno;
}

const caracteresEspeciais: string[] = ['(', ')', '.', '^', '$', '[', ']', '?', '*', '+', ':', '{', '}', '\\'];

export function geraRegExpTextoSimples(textoProcurado: string, flags = 'g') {
    let r = textoProcurado;
    for (const c of caracteresEspeciais) {
        r = r.replace(c, `\\${c}`);
    }
    try {
        return new RegExp(r, flags);
    } catch (e) {
        throw new Error(`Expressão irregular inválida: ${r} - ${e.message}`);
    }
}
