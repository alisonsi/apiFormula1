(function buscarCorridasInformacoes(){
    let ano = localStorage.getItem("ano");
    console.log(ano)
    if(ano==null){
        alert("escolha um ano")
    }else{
    const url = `http://ergast.com/api/f1/${ano}/driverStandings.json` ;
    const methods = {
        methods:'GET'
    }
    const request = new Request(url,methods);

    fetch(request)
    .then(function(response){
        return response.json();
    })
    .then(function(data){ 
       
        const results =  data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        const classificacao = results
            .map(list => ({
                posicao:list.position,
                pontos:list.points,
                nome:{
                        primeiroNome :list.Driver.givenName,
                        segundoNome: list.Driver.familyName
                    },
                nacionalidade: list.Driver.nationality,
                equipe:list.Constructors[0].name
            })
        )
        renderizarClassificacao(classificacao)
        localStorage.removeItem("ano")
    })
}
})();

function renderizarClassificacao(classificacaoCampeonato){
    var tabela = "";
    const listaCorridas = document.querySelector("#tabelaCorridas");
    listaCorridas.innerHTML = "";
    for(var i=0;i<classificacaoCampeonato.length;i++){    
        tabela += `
                    <tr >
                    <td>${classificacaoCampeonato[i].posicao}</td>    
                    <td>${classificacaoCampeonato[i].nome.primeiroNome} ${classificacaoCampeonato[i].nome.segundoNome}</td>  
                    <td>${classificacaoCampeonato[i].nacionalidade}</td>
                    <td>${classificacaoCampeonato[i].equipe}</td>
                    <td>${classificacaoCampeonato[i].pontos}</td>
                    </tr>
                    
        `
 
    }
   
    listaCorridas.innerHTML = tabela;
    
    
}