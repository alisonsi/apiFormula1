
const dropDownAno = document.querySelector(".drop-down-ano");
const dropDownCorrida = document.querySelector(".drop-down-corrida");

selecionarAno();

function selecionarAno(){
    myDropDown = dropDown(1950,2017)
    dropDownAno.insertAdjacentHTML("beforeend",myDropDown);
    selecionarCorrida()
}
function selecionarCorrida(){
    //inicio de um serviço
    const ano = document.getElementById("ano").value;
    const corrida = document.getElementById("corrida");
    const url = `http://ergast.com/api/f1/${ano}.json`;
    const methods = {
        methods:'GET'
    }
    const request = new Request(url,methods)
    fetch(request)
        .then(function(response){
            return response.json();
        })
        .then(function(data){                        
            
            const myDropDown = dropDown(1,data.MRData.total)
            dropDownCorrida.innerHTML = myDropDown;

            const informacoes = document.querySelector(".informacoes");
            const results =  data.MRData.RaceTable.Races[corrida.value];            
            const temporada = {               
                    nomeCircuito: results.Circuit.circuitName,
                    data: results.date,
                    pais: results.Circuit.Location.country,
                    estado: results.Circuit.Location.locality,                
                }
            informacoes.innerHTML = `
            <li><strong>Circuito: </strong> ${temporada.nomeCircuito}</li>
            <li><strong>Data: </strong>${temporada.data}</li>
            <li><strong>Pais: </strong>${temporada.pais}</li>
            <li><strong>Estado: </strong>${temporada.estado}</li>
            `
            
            
        })
        .catch(function(error){
            console.log(error);
        })
        //fim
}

function dropDown(inicio, fim){
    var myDropDown=" ";
    for (var index = inicio; index <= fim; index++) {
        myDropDown += `<option value=${index}>${index}</option>`;
    }
    return myDropDown;
}
