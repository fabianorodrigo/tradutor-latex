'use strict';

const axios = require('axios');

module.exports = function (Utils) {

    Utils.traduzir = function (parametros, cb) {

        axios.post(`https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_API_KEY}`,parametros).then(response => {
            //console.log(response.data.data)
            cb(null, response.data.data.translations);
        }).catch(function (e) {
            cb(e);
        })

    }

    Utils.remoteMethod('traduzir', {
        accepts: [{ arg: 'parametros', type: 'object', root: true, http: { source: 'body' } }],
        returns: { arg: 'traducao', type: 'Model', root: true },
        http: {
            path: '/traduzir',
            verb: 'post'
        }
    });
};
