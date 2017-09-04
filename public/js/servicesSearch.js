/*Essa função executa automatico ao iniciar a página
É buscado o total de temporadas para criar o dropdown ano
Em seguida é chamado as funções para recuperar as informações sobre o evento em si
e informações sobre a corrida*/
function buscarTotalTemporadas(){
    
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
            anoFinal: data.MRData.SeasonTable.Seasons[tamanho-1].season,
        }
        criarDropDownAno(totalTemporadas.anoInicial,totalTemporadas.anoFinal);
        buscarCorridasInformacoes(totalTemporadas.anoInicial,1);
        buscarTemporadaInformacoes(totalTemporadas.anoInicial,1);
        descricaoTemporada(totalTemporadas.anoInicial);
    })
};

function descricaoTemporada(ano){
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
        let uri = data.MRData.SeasonTable.Seasons;
        
        var descricao = uri.filter(function isBigEnough(value) {
            return value.season == ano;
          });
          renderizarDescricao(descricao[0].url);
    })
};

//ao clicar no butão buscar essa função é chamada
function solicitarBuscarCorridaInfo(){
    let  ano = document.querySelector("#ano").value;
    let corrida = document.querySelector("#corrida").value;

    buscarCorridasInformacoes(ano, corrida);
    buscarTemporadaInformacoes(ano,corrida);
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
function buscarTemporadaInformacoes(ano,corrida){
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

function renderizarDescricao(descricao){
    
    const listaCorridas = document.querySelector(".descricao");
    listaCorridas.innerHTML = `<strong>História sobre essa corrida:</strong>${descricao}`
    
}

function renderizarCorridas(classificacaoCorrida){
    var tabela = "";
    const listaCorridas = document.querySelector("#tabelaCorridas");
    listaCorridas.innerHTML = "";
    for(var i=0;i<3;i++){    
        tabela += `
                    <tr >
                    <td>${classificacaoCorrida[i].posicao}</td>    
                    <td>${classificacaoCorrida[i].nome}</td>
                    <td>${classificacaoCorrida[i].equipe}</td>    
                    <td>${classificacaoCorrida[i].tempo.time}</td>
                    </tr>
                    
        `
        // class="lista" onclick="mostrar(this)"
        //listaCorridas.insertAdjacentHTML("beforeend",tabela);
        
    }
    //adionar um ouvinte para o clice em uma linha    
    // listaCorridas.addEventListener("click", mostrar(this));
    listaCorridas.innerHTML = tabela;
    
    
}

// function mostrar(evento){ 
    
            
//     let corredorInfo = document.querySelector(".corredorInfo")
//     let ano = document.querySelector("#ano").value;
//     let corrida = document.querySelector("#corrida").value;
//     let nome = evento.getElementsByTagName('td');
    
//     const url = `http://ergast.com/api/f1/${ano}/drivers/${nome[1].innerHTML}/status.json` ;
//     const methods = {
//         methods:'GET'
//     }
//     const request = new Request(url,methods);

//     fetch(request)
//         .then(function(response){
//             return response.json();
//         })
//         .then(function(data){
//     console.log(data)
//             let text = `<h2>${data}</h2> `
//             corredorInfo.innerHTML = text;
//             corredorInfo.style.display = "block";
//         })
// }


function renderizarTemporada(temporada){
    const informacoes = document.querySelector(".informacoes");
    const buttoBuscarClassificacao = document.getElementById("myButtoClassification")
    console.log(buttoBuscarClassificacao)
    buttoBuscarClassificacao.disabled = false;
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
criarDropDownAno(1950,2017);

function redirectClassification(){
    let  ano = document.querySelector("#ano").value; 
       
    localStorage.setItem("ano",ano)
    window.location = "http://localhost:3000/classification.html";
}