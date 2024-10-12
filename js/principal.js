window.addEventListener('load', function() {
    
    // Referencias campos en pantalla principal.html
    const msgSuccess = this.document.getElementById('msgSuccess')

    // Recuperamos el nombre de usuario
    const result = JSON.parse(this.localStorage.getItem('result'))

    // Mostrar el nombre de usuaio en alerta
    mostrarAlerta(`Bienvenido ${result.nombreUsuario}`)

})

function mostrarAlerta(mensaje) {
    msgSuccess.innerHTML = mensaje
    msgSuccess.style.display = 'block'
}