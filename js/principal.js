window.addEventListener('load', function(){

    //Referenciar elementos de la PAG
    const msjSuccess = this.document.getElementById('msjSuccess');

    //Recuperar nombre del usuario del local storage
    const result = JSON.parse(this.localStorage.getItem('result'));
    mostrarAlerta(`Bienvenido ${result.user}`); //Cambiar

});

function mostrarAlerta(mensaje){
    msjSuccess.innerHTML = mensaje;
    msjSuccess.style.display = 'block';
}

function ocultarAlerta(){
    msjSuccess.innerHTML = '';
    msjSuccess.style.display = 'none';
}