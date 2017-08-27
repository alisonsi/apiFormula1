var express = require('express');
var corridasRouting = require('../app/rotas/corridas.routing')
// Exportando módulo (Padrão CommonJS)
module.exports = function() {
 var app = express();
 //Definindo variável de aplicação
    app.set("port", 3000);
    app.use(express.static('./public'))
    corridasRouting(app);
    return app;
};