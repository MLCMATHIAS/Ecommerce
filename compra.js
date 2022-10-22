const compra = new Carrito()
const listaCompra = document.querySelector("#lista-compra tbody")
const procesarCompraBtn = document.getElementById('procesar-compra')
const cliente = document.getElementById('cliente')
const correo = document.getElementById('correo')

cargarEventos()

function cargarEventos() {
    document.addEventListener('DOMContentLoaded', compra.leerLocalStorageCompra())

    compra.calcularTotal()
    if(procesarCompraBtn){
    procesarCompraBtn.addEventListener('click', procesarCompra)
    }

}

function procesarCompra(e){
    e.preventDefault()

    if (compra.obtenerProductosLocalStorage().length === 0){
        swal({
            title: "Error",
            text: "No tienes productos en el carrito",
            icon: "warning",
          });
    }
    else if(cliente.value === '' || correo.value === ''){
        swal({
            title: "Error!",
            text: "Ingrese su nombre y el correo, por favor",
            icon: "warning",
          });
    }
    else{
        const cargandoGif = document.querySelector('#cargando')
        cargandoGif.style.display = 'block'

        const enviado = document.createElement('img')
        enviado.src = 'img/mail.gif'
        enviado.style.display = 'block'
        enviado.width = "150"

        setTimeout(() => {
            cargandoGif.style.display = 'none'
            document.querySelector('#loaders').appendChild(enviado)

            setTimeout(() => {
                enviado.remove()
                compra.vaciarLocalStorage()
                window.location = "index.html"
            }, 2000)
        }, 3000)
    }
}