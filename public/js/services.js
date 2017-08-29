/*Essa função executa automatico ao iniciar a página
É buscado o total de temporadas para criar o dropdown ano
Em seguida é chamado as funções para recuperar as informações sobre o evento em si
e informações sobre a corrida*/
(function buscarTotalTemporadas(){
    
    const url = `http://ergast.com/api/f1/seasons.json?limit=68` ;
    const methods = {
        methods:'GET'
    }
    const request = new Request(url,methods);

    fetch(request)
    .then(function(response){
        return response.json();
    })
    .then(function(data){ 
        
        tamanho = data.MRData.SeasonTable.Seasons.length;
        
        totalTemporadas = 
        {   anoInicial: data.MRData.SeasonTable.Seasons[0].season,
            anoFinal: data.MRData.SeasonTable.Seasons[tamanho-1].season
        }
        criarDropDownAno(totalTemporadas.anoInicial,totalTemporadas.anoFinal);
        buscarCorridasInformacoes(totalTemporadas.anoInicial,1);
        buscarTempordaInformacoes(totalTemporadas.anoInicial,1);
    })
})();

//ao clicar no butão buscar essa função é chamada
function solicitarBuscarCorridaInfo(){
    let  ano = document.querySelector("#ano").value;
    let corrida = document.querySelector("#corrida").value;

    buscarCorridasInformacoes(ano, corrida);
    buscarTempordaInformacoes(ano,corrida);
}
function buscarCorridasInformacoes(ano,corrida){
    
    const url = `http://ergast.com/api/f1/${ano}/${corrida}/results.json` ;
    const methods = {
        methods:'GET'
    }
    const request = new Request(url,methods);

    fetch(request)
    .then(function(response){
        return response.json();
    })
    .then(function(data){ 
        //endpoint races/ano/corrida
        const results =  data.MRData.RaceTable.Races[0].Results;
        const classificacao = results
            .map(list => ({
                nome:list.Driver.familyName,
                posicao:list.position,
                equipe:list.Constructor.constructorId,
                tempo: (list.Time != undefined) ? list.Time : {time:"-"},
            })
        )
        renderizarCorridas(classificacao)
    })
}
function buscarTempordaInformacoes(ano,corrida){
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
            
            const results =  data.MRData.RaceTable.Races[corrida-1];
            
           temporada = {
                ano: data.MRData.RaceTable.season,
                totalCorridas: data.MRData.total,
                nomeCircuito: results.Circuit.circuitName,
                data: results.date,
                pais: results.Circuit.Location.country,
                estado: results.Circuit.Location.locality,
            }
            
            renderizarTemporada(temporada);
            
        })
        .catch(function(error){
            console.log(error);
        })
}
function renderizarCorridas(classificacaoCorrida){
    
    const listaCorridas = document.querySelector("#tabelaCorridas");
    listaCorridas.innerHTML = "";
    for(var i=0;i<3;i++){    
        tabela = `
                    <tr>
                    <td>${classificacaoCorrida[i].posicao}</td>    
                    <td>${classificacaoCorrida[i].nome}</td>
                    <td>${classificacaoCorrida[i].equipe}</td>    
                    <td>${classificacaoCorrida[i].tempo.time}</td>
                    </tr>
        `
        //listaCorridas.insertAdjacentHTML("beforeend",tabela);
        listaCorridas.innerHTML += tabela;
    }
    
}
function renderizarTemporada(temporada){
    const informacoes = document.querySelector(".informacoes");
    
                informacoes.innerHTML = `
                <li><strong>Circuito: </strong> ${temporada.nomeCircuito}</li>
                <li><strong>Data: </strong>${temporada.data}</li>
                <li><strong>Pais: </strong>${temporada.pais}</li>
                <li><strong>Estado: </strong>${temporada.estado}</li>
                `
}
function criarDropDownAno(min, max){
    
    let dropDownAno = document.querySelector(".drop-down-ano"); 
    dropDownAno.innerHTML = dropDown(min,max);
    criarDropDownCorrida(min);
}
function criarDropDownCorrida(ano){
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
       const max = data.MRData.total;
       let dropDownCorrida = document.querySelector(".drop-down-corrida");
       dropDownCorrida.innerHTML = dropDown(1,max)
       
    })
}
function dropDown(inicio, fim){
    var myDropDown=" ";
    for (var index = inicio; index <= fim; index++) {
        myDropDown += `<option value=${index}>${index}</option>`;
    }
    return myDropDown;
}