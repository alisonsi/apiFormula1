module.exports.buscarTemporadaECorridas =  function(req,res){
    
    const url = `http://ergast.com/api/f1/${temporada}/${corrida}/results.json` ;
    const methods = {
        methods:'GET'
    }
    const request = new Request(url,methods)
    fetch(request)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            
            const results =  data.MRData.RaceTable.Races[0].Results;
            const podio = results
                .map(list => ({
                    nome:list.Driver.familyName,
                    posicao:list.position,
                    equipe:list.Constructor.constructorId,
                    tempo: (list.Time != undefined) ? list.Time : {time:"-"},
                })
            )
            res.status(200).json(podio)
        })
        .catch(function(error){
            console.log(error);
        })
}
    