var fileJS = document.createElement('script');
fileJS.src = "js/services.js";
document.head.appendChild(fileJS);

function hd(){
    var str = buscarTemporadaInformacoes();
    console.log(str);
}