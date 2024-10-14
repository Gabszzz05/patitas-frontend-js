/*
Se ejecuta cuando la pagina carga completamente (DOM, CSS, JS, IMG...)

En caso deseas ejecutar el JS a penas se haya cargado el DOM:
=> document.addEventListener('DOMContentLoaded', {})
=> En la importacion del script, agregando el atributo "defer"
*/
window.addEventListener('load', function(){
    
    //Referenciar elementos de la Pag
    const tipoDocumento = this.document.getElementById('tipoDocumento');
    const numeroDocumento = this.document.getElementById('numeroDocumento');
    const password = this.document.getElementById('password');
    const btnIngresar = this.document.getElementById('btnIngresar');
    const msjError = this.document.getElementById('msjError');

    //Implementar listener
    btnIngresar.addEventListener('click', function(){
        //Validar campos de entrada
        if(tipoDocumento.value === null || tipoDocumento.value.trim() === '' || 
           numeroDocumento.value === null || numeroDocumento.value.trim() === '' ||
           password.value === null || password.value.trim() === ''){

            //Mostrar texto en el alert
            mostrarAlerta('ERROR : Debe completar los campos correctamente');
            return;
        }
        ocultarAlerta();

        //Consumir action del MVC
        autenticar();
    });
});

function mostrarAlerta(mensaje){
    msjError.innerHTML = mensaje;
    msjError.style.display = 'block';
}

function ocultarAlerta(){
    msjError.innerHTML = '';
    msjError.style.display = 'none';
}

async function autenticar(){
    const URL = 'http://localhost:8082/login/autenticar-async';
    const data = {
        tipoDocumento: tipoDocumento.value,
        numeroDocumento: numeroDocumento.value,
        password: password.value 
    };

    try{
        const response = await fetch(URL, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)});

        if(!response.ok){
            mostrarAlerta('ERROR: Ocurrió un problema en la autenticacion');
            throw new Error(`ERROR: ${response.statusText}`);
        }

        //Validar respuesta
        const result = await response.json();
        console.log('Respuesta del Servidor: ', result);

        if(result.code === '00'){
            localStorage.setItem('result', JSON.stringify(result));
            setTimeout(() => {
                window.location.replace('principal.html');
            }, 2000);
        }else{
            mostrarAlerta(result.msj); 
        }

    }catch(error){
        console.error('ERROR: Ocurrió un problema no identificado', error);
        mostrarAlerta('ERROR: Ocurrió un problema no identificado');
    }
}