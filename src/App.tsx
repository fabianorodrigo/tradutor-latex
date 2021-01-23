import React, {useState} from 'react';
import './App.css';
import {Button, Icon, TextField, Typography} from '@material-ui/core';
import {Controller, useForm} from 'react-hook-form';
import {traduzir} from './Tradutor';
import {replacesLatex} from './replacesLatex';

function App() {
    const [api_key, setApi_key] = useState(localStorage.getItem('translator_ak'));
    const [original, setOriginal] = useState('');
    const [traducao, setTraducao] = useState('');
    const {control, handleSubmit} = useForm();

    const onSubmit = async (data: any) => {
        if (data.google_api_key == null || data.google_api_key.trim() == '') {
            alert('Sem informar uma chave/token, não é possível invocar a API do Google Translator');
        } else {
            localStorage.setItem('translator_ak', data.google_api_key);
            const resultado = await traduzir(data.google_api_key, {q: data.latex_original, source: 'pt', target: 'en'});
            setTraducao(replacesLatex(resultado));
        }
    };

    return (
        <div className="App">
            <Typography variant="h5" gutterBottom color="primary">
                Tradutor de Textos Latex via API Google Translator
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    key="text_google_api_key"
                    as={TextField}
                    control={control}
                    id="text_google_api_key"
                    name="google_api_key"
                    label="Google API Key"
                    style={{margin: 8}}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        readOnly: false,
                    }}
                    defaultValue={api_key}
                />
                <Controller
                    key="text_area_latex_original"
                    as={TextField}
                    control={control}
                    id="text_area_latex_original"
                    name="latex_original"
                    label="Latex Original (Português)"
                    multiline
                    rowsMax={10}
                    style={{margin: 8}}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        readOnly: false,
                    }}
                    defaultValue={original}
                />
                <Button type="submit" color="primary" variant="contained">
                    Traduzir
                </Button>
            </form>
            <br />
            <TextField
                id="standard-multiline-flexible"
                label="Tradução (Inglês)"
                multiline
                rowsMax={20}
                value={traducao}
                style={{margin: 8}}
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                InputProps={{
                    readOnly: false,
                }}
            />
        </div>
    );
}

export default App;
