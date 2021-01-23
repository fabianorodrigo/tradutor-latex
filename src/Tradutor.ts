import axios, {AxiosInstance} from 'axios';
import {IParametrosGoogleTranslator} from './IParametrosGoogleTranslator';

const URL_TRANSLATOR_API = `https://translation.googleapis.com/language/translate/v2?key=`;

const apiClient: AxiosInstance = axios.create({
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
    },
});
export async function traduzir(apiKey: string, parametros: IParametrosGoogleTranslator) {
    try {
        const paragrafos: string[] = parametros.q.split('\n').filter((p) => p.trim() !== '');
        let response = await apiClient.post(URL_TRANSLATOR_API.concat(apiKey), {...parametros, q: paragrafos});
        console.log(response.data.data);
        return response.data.data.translations.map((t: {translatedText: string}) => t.translatedText).join('\n\n');
    } catch (e) {
        console.error(e);
        throw e;
    }
}
