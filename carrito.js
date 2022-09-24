

const ham = document.querySelector('.ham')
const enlaces = document.querySelector('.enlaces-menu')

ham.addEventListener('click', () => {
    enlaces.classList.toggle('activado')
})

class Carrito {
    //Añadir producto al carrito
    comprarProducto(e) {
        e.preventDefault()
        //Delegado para agregar al carrito
        if (e.target.classList.contains('agregar-carrito')) {
            const producto = e.target.parentElement.parentElement
            //Enviamos el producto seleccionado para tomar sus datos
            this.leerDatosProducto(producto)
        }
    }
    leerDatosProducto(producto) {
        const infoProducto = {
            imagen: producto.querySelector('img').src,
            titulo: producto.querySelector('h3').textContent,
            precio: producto.querySelector('.precio span').textContent,
            id: producto.querySelector('a').getAttribute('data-id'),
            cantidad: 1
        }
        // guardar productos local Storage.
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (productoLS) {
            if (productoLS.id === infoProducto.id) {
                productosLS = productoLS.id;
            }
        });
      
        if (productosLS === infoProducto.id) {
              // implemento libreria sweetalert.
            swal.fire({
                title: "Error!",
                text: "El producto ya está agregado",
                icon: "warning",
            });
        }
        else {
            this.insertarCarrito(infoProducto);
        }

    }
    insertarCarrito(producto) {
        const row = document.createElement('tr')
        row.innerHTML = `
        <td>
            <img src="${producto.imagen}" width=100>
        </td>
        <td>${producto.titulo}</td>
        <td>${producto.precio}</td>
        <td>
            <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
        </td>
    `
        listaProductos.appendChild(row)
        this.guardarProductosLocalStorage(producto)
    }

    vaciarCarrito(e) {
        e.preventDefault()
        while (listaProductos.firstChild) {
            listaProductos.removeChild(listaProductos.firstChild)
        }
        this.vaciarLocalStorage()
        return false
    }
    guardarProductosLocalStorage(producto) {
        let productos
        productos = this.obtenerProductosLocalStorage()
        productos.push(producto)
        localStorage.setItem('productos', JSON.stringify(productos))
    }
    obtenerProductosLocalStorage() {
        let productoLS
        if (localStorage.getItem('productos') === null) {
            productoLS = []

        }
        else {
            productoLS = JSON.parse(localStorage.getItem('productos'))
        }
        return productoLS
    }
    eliminarProductoLS(productoID) {
        let productosLS
        //Obtenemos el arreglo de productos

        productosLS = this.obtenerProductosLocalStorage()
        //Comparar el id del producto borrado con LS
        productosLS.forEach(function (productoLS, index) {
            if (Number(productoLS.id) === productoID) {
                productosLS.splice(index, 1)
            }
            window.location.reload()
        })
        localStorage.setItem('productos', JSON.stringify(productosLS))
    }

    //Mostrar los productos guardados en el LS
    leerLocalStorage() {
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (producto) {
            //Construir plantilla
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img src="${producto.imagen}" width=100>
                </td>
                <td>${producto.titulo}</td>
                <td>${producto.precio}</td>
                <td>
                    <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
                </td>
            `;
            listaProductos.appendChild(row);
        });
    }
    vaciarLocalStorage() {
        localStorage.clear()
    }
}