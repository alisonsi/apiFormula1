
function buscarCorridas(){
    let  ano = document.querySelector("#ano").value;
    let corrida = document.querySelector("#corrida").value;
    

    const url = `http://localhost:3000/api/corridas/${ano}/${corrida}` ;
    const methods = {
        methods:'GET'
    }
    const request = new Request(url,methods);

    fetch(request)
    .then(function(response){
        return response.json();
    })
    .then(function(data){                        
        renderizarCorridas(data);
    })
}
function buscar(){
    buscarTemporada();
    buscarCorridas();

}
function buscarTemporada(){
    let  ano = document.querySelector("#ano").value;
    let corrida = document.querySelector("#corrida").value;
    const url = `http://localhost:3000/api/temporada/${ano}/${corrida}` ;
    const methods = {
        methods:'GET'
    }
    const request = new Request(url,methods)
    fetch(request)
        .then(function(response){
            return response.json();
        })
        .then(function(data){                        
            renderizarTemporada(data)
            criarDropDownCorrida(1,data.totalCorridas)
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
function alterarDropdownCorrida(){
   // let dropDownAno = document.querySelector(".drop-down-ano").value;
    let totalCorridas = buscarTemporada();
    criarDropDownCorrida(1,totalCorridas);
}
function criarDropDowns(){
    criarDropDownAno(1950,2017);

    criarDropDownCorrida(1,9)
};
function criarDropDownAno(min, max){
    let dropDownAno = document.querySelector(".drop-down-ano"); 
    dropDownAno.innerHTML = dropDown(min,max);

}
function criarDropDownCorrida(min, max){
    let dropDownCorrida = document.querySelector(".drop-down-corrida");
    let dropDownCorridaSave = dropDownCorrida.value;
    dropDownCorrida.innerHTML = dropDown(min,max)
    console.log(dropDownCorridaSave)
    dropDownCorrida.options[dropDownCorridaSave-1].selected = true;
}

function dropDown(inicio, fim){
    var myDropDown=" ";
    for (var index = inicio; index <= fim; index++) {
        myDropDown += `<option value=${index}>${index}</option>`;
    }
    return myDropDown;
}