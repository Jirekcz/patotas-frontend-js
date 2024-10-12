/* Se ejecuta cuando la pagina ha cargado completamente (DOM, CSS, IMG, etc...) */
/* En caso desees ejecutar el JS a penas se haya cargado el DOM, puedes usar 2 tecnicas:
    -> document.addEventListerner('DOMContentLoaded', {});
    -> <script type="module" src="js/inicio.js" defer></script>
*/
document.addEventListener('DOMContentLoaded', function() {
    
    // Referencias controles del formulario
    const tipoDocumento = document.getElementById('tipoDocumento')
    const numeroDocumento = document.getElementById('numeroDocumento')
    const password = document.getElementById('password')
    const btnIngresar = document.getElementById('btnIngresar')
    const msgError = document.getElementById('msgError')

    // Implementar listener del boton ingresar
    btnIngresar.addEventListener('click', function() {

        // Validar campos del formulario
        if(tipoDocumento.value === null || tipoDocumento.value.trim() === '' ||
            numeroDocumento.value === null || numeroDocumento.value.trim() === '' ||
            password.value === null || password.value.trim() === '') {
                mostrarAlerta('Ingresar las datos correctamente')
                return;
        }
        ocultarAlerta()
        autenticar()
    })
})

function mostrarAlerta(mensaje) {
    msgError.innerHTML = mensaje
    msgError.style.display = 'block'
}

function ocultarAlerta() {
    msgError.innerHTML = '',
    msgError.style.display = 'none'
}

async function autenticar() {
    const url = 'http://localhost:8082/login/autenticar-async'
    const request = {
        tipoDocumento: tipoDocumento.value,
        numeroDocumento: numeroDocumento.value,
        password: password.value
    }

    // Todo servicio que sera llamado debera estar en un try_catch
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // Convertir el objeto que tiene request a JSON
            body: JSON.stringify(request)
        })

        if(!response.ok) {
            mostrarAlerta('Error: Ocurrio un problema con la autenticacion')
            throw new Error(`Error: ${response.statusText}`)
        }

        // Validar respuesta
        const result = await response.json()
        console.log('Respuesta del servidor: ' + result)

        if(result.codigo === '00') {
            // stringify() para convertir de objeto a JSON
            localStorage.setItem('result', JSON.stringify(result))
            // replace() para desactivar la navegacion
            window.location.replace('principal.html')
        } else {
            mostrarAlerta(result.mensaje)
        }

    } catch (error) {
        mostrarAlerta('Error: Ocurrio un problema con la autenticacion')
    }
}