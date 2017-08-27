(function buscarCorrridas(){
    var temporada = 1950;
    var corrida = 1;

    const url = `http://localhost:3000/api/corridas/${temporada}/${corrida}` ;
    const methods = {
        methods:'GET',
        type: 'cors'
    }
    const request = new Request(url,methods);
    fetch(request)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            
            const results =  data;                  
            console.log(result);
        })
        .catch(function(error){
            console.log(error);
        })
})();