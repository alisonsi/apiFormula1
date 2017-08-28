var controllerCorridas = require("../controllers/corridas.controller.js");
var cors = require('cors')

module.exports = function(app){
    app.
    use(cors()).
    //Retorna o usuario de um determinado post
    get("/api/corridas/:ano/:corrida", controllerCorridas.buscarTemporadaECorridas).
    get("/api/temporada/:ano/:corrida",controllerCorridas.buscarTemporada)
}

