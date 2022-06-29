window.onload = iniciar;

// LOS PRODUCTOS SE VAN AGREGANDO.
const fragment = document.createDocumentFragment(); //CREAN ESPACIO DONDE IRA LA CARD
const templateCard = document.getElementById('template-card').content; //LA CARD
const items = document.getElementById('listar-productos')
//MI ARRAY DE OBJETOS (PRODUCTOS EN VENTA)
class Producto {

    constructor(item){
        this.id = item.id;
        this.titulo = item.titulo
        this.imagen = item.imagen
        this.precio = item.precio
        this.descripcion= item.descripcion
    }

};

const agregarProductos = [
    new Producto ({id: "1", titulo: "BLUE LIFE", imagen: "img/gorra1.jpg" ,precio: 2000}),
    new Producto ({id: "2", titulo: "ARBOL", imagen: "img/gorra2.jpg" ,precio: 2400}),
    new Producto ({id: "3", titulo: "MOUNTAIN", imagen: "img/gorra3.jpg" ,precio: 1500}),
    new Producto ({id: "4", titulo: "B & A", imagen:"img/gorra4.jpg"  ,precio: 1500}),
    new Producto ({id: "5", titulo: "BIRD", imagen: "img/gorra5.jpg" ,precio: 2000}),

   
];

//creando las cards
agregarProductos.forEach((item) => {
    templateCard.querySelector('h3').textContent = item.titulo
    templateCard.querySelector('span').textContent = item.precio
    templateCard.querySelector('img').setAttribute("src", item.imagen)
   
    templateCard.querySelector('.agregar-carrito').dataset.id = item.id

// clonar Cards.
    const clone = templateCard.cloneNode(true)
    fragment.appendChild(clone)
})
//se crea la card.
items.appendChild(fragment)


