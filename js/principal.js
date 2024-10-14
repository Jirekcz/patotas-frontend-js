window.addEventListener('load', function() {
    
    // Referencias campos en pantalla principal.html
    const msgSuccess = this.document.getElementById('msgSuccess')
    const btnCerrarSesion = this.document.getElementById('btnCerrarSesion')

    // Recuperamos el nombre de usuario
    const result = JSON.parse(this.localStorage.getItem('result'))

    // Mostrar el nombre de usuaio en alerta
    mostrarAlerta(`Bienvenido ${result.nombreUsuario}`)

    btnCerrarSesion.addEventListener('click', function() {
        cerrarSesion()
    })

})

function mostrarAlerta(mensaje) {
    msgSuccess.innerHTML = mensaje
    msgSuccess.style.display = 'block'
}


async function cerrarSesion() {
    const url = 'http://localhost:8082/login/logout-async'
    const datos = JSON.parse(localStorage.getItem('datos'))
    const request = {
        tipoDocumento: datos.tipoDocumento,
        numeroDocumento: datos.numeroDocumento
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
            mostrarAlerta('Error: Ocurrio un problema con el cerrado de sesion')
            throw new Error(`Error: ${response.statusText}`)
        }

        // Validar respuesta
        const result = await response.json()
        console.log('Respuesta del servidor: ' + result)

        if(result.resultado === true) {
            window.location.replace('index.html')
        } else {
            mostrarAlerta(result.mensaje)
        }

    } catch (error) {
        mostrarAlerta('Error: Ocurrio un problema con el cerrado de sesion')
    }
}