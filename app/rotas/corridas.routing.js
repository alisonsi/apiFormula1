var controllerCorridas = require("../controllers/corridas.controller.js");
var cors = require('cors')

module.exports = function(app){
    app.
    use(cors()).
    //Retorna o usuario de um determinado post
    get("/api/corridas/temporada/ano", controllerCorridas.buscarTemporadaECorridas)

}

