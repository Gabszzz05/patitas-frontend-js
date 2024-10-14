window.addEventListener('load', function(){

    //Referenciar elementos de la PAG
    const msjSuccess = this.document.getElementById('msjSuccess');
    
    //
    const btnLogOut = this.document.getElementById('logout');

    //Recuperar nombre del usuario del local storage
    const result = JSON.parse(this.localStorage.getItem('result'));
    mostrarAlerta(`Bienvenido ${result.user}`);

    //Listener Cierre Sesion
    btnLogOut.addEventListener('click', async function(){
        //Funcion
        logout();
    })

});

function mostrarAlerta(mensaje){
    msjSuccess.innerHTML = mensaje;
    msjSuccess.style.display = 'block';
}

function ocultarAlerta(){
    msjSuccess.innerHTML = '';
    msjSuccess.style.display = 'none';
}

//Cierre Sesion
async function logout(){
    const URL = 'http://localhost:8082/login/logout-async';

    try{
        const response = await fetch(URL, {method: 'POST'});

        if (!response.ok) {
            throw new Error(`ERROR: ${response.statusText}`);
        }

        const result = await response.json();
        console.log('Respuesta del servidor al cerrar sesión:', result);

        if (result.code === '00') {
            // Limpiar localStorage y redirigir a la página de inicio
            localStorage.removeItem('result');
            setTimeout(() => {
                window.location.replace('index.html');
            }, 2000);
        } else {
            mostrarAlerta(result.msj);
        }
    } catch (error) {
        console.error('ERROR: Ocurrió un problema al cerrar sesión', error);
        mostrarAlerta('ERROR: Ocurrió un problema al cerrar sesión');
    }
}