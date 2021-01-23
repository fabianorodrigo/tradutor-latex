/**
 * Mapeamento do conjunto de palavras chaves do Latex que deverão ser tratados
 * haja vista que o Google Translator deforma a sintaxe. Por exemplo, "\textit{algo}"
 * é transformado em "\ textit {algo}"
 *
 * A constante retornada tem 3 propriedades:
 *
 * pre_chaves: Com a lista de palavras que são acompanhadas de chaves: \textit{...}, \citep{...}
 * pre_colchetes: Com a lista de palavras que são acompanhadas de colchetes: \lstinputlisting[...]
 * simples: Com a lista de palavras que não possuem acompanhamento: \item, \noindent, ...
 */
export const LatexPalavrasChaves = {
    pre_chaves: [
        'cite',
        'citep',
        'texttt',
        'textit',
        'underline',
        'begin',
        'end',
        'section',
        'label',
        'subsection',
        'ref',
        'vspace',
        'footnote',
        'newcommand',
        'color',
        'caption',
        'textbf',
    ],
    pre_colchetes: ['lstinputlisting', 'includegraphics'],
    simples: ['item', 'noindent', 'centering', 'highlight', 'small', 'hline', 'textasciicircum'],
};
