const request = require('request');

module.exports.buscarTemporadaECorridas =  function(req,res){
    let ano = req.params.ano;
    let corrida = req.params.corrida;

    const url = `http://ergast.com/api/f1/${ano}/${corrida}/results.json` ;
    console.log(url)
    request(url, function (error, response, body) {
        const data = JSON.parse(body);
        const results =  data.MRData.RaceTable.Races[0].Results;
        const classificacao = results
            .map(list => ({
                nome:list.Driver.familyName,
                posicao:list.position,
                equipe:list.Constructor.constructorId,
                tempo: (list.Time != undefined) ? list.Time : {time:"-"},
            })
        )
        res.send(classificacao)
      });
   
}
module.exports.buscarTemporada =  function(req,res){
    let ano = req.params.ano;
    let corrida = req.params.corrida - 1;

    console.log(ano)
    console.log(corrida)
    const url = `http://ergast.com/api/f1/${ano}.json` ;
    
    request(url, function (error, response, body) {
        const data = JSON.parse(body);
        const results =  data.MRData.RaceTable.Races[corrida];
        
        const temporada = {
            totalCorridas: data.MRData.total,
            nomeCircuito: results.Circuit.circuitName,
            data: results.date,
            pais: results.Circuit.Location.country,
            estado: results.Circuit.Location.locality,
        }
        res.send(temporada);
        });
   
}
    