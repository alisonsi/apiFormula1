function buscarCorridas(){
    const ano = document.getElementById("ano").value;
    const corrida = document.getElementById("corrida").value;    
    buscarTemporadaECorridas(ano,corrida);
}
function buscarTemporadaECorridas(temporada,corrida){
    
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
            const listaCorridas = document.querySelector("#tabelaCorridas");
            listaCorridas.innerHTML = "";
            for(var i=0;i<3;i++){
        
                tabela = `
                         <tr>
                            <td>${podio[i].posicao}</td>    
                            <td>${podio[i].nome}</td>
                            <td>${podio[i].equipe}</td>    
                            <td>${podio[i].tempo.time}</td>
                            </tr>
                `
                //listaCorridas.insertAdjacentHTML("beforeend",tabela);
                listaCorridas.innerHTML += tabela;
            }
            
            
        })
        .catch(function(error){
            console.log(error);
        })
}
    