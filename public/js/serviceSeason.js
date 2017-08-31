buscarTempordaInformacoes(2012);
function buscarTempordaInformacoes(ano){
    const url = `http://ergast.com/api/f1/${ano}.json` ;
    const methods = {
        methods:'GET'
    }
    const request = new Request(url,methods);

    fetch(request)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            
            const results =  data.MRData.RaceTable.Races;
        
            renderizarTemporada(results);
            
        })
        .catch(function(error){
            console.log(error);
        })
}

function renderizarTemporada(temporada){
    const listaCorridas = document.querySelector("#tabelaCorridas");
    const th = "<th>Ano</th> <th>Corrida</th> <th>Circuito</th> <th>Estado</th> <th>País</th>"
    listaCorridas.insertAdjacentHTML("beforeend",th);
    for(var i=0;i<8;i++){    
        tabela = `
                    <tr>
                    <td>${temporada[i].season}</td>    
                    <td>${temporada[i].raceName}</td>
                    <td>${temporada[i].Circuit.circuitName}</td>    
                    <td>${temporada[i].Circuit.Location.locality}</td>
                    <td>${temporada[i].Circuit.Location.country}</td>
                    </tr>
        `
        //listaCorridas.insertAdjacentHTML("beforeend",tabela);
        
        listaCorridas.insertAdjacentHTML("beforeend",tabela)
    }
}