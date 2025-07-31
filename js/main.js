// Declaración de campos
const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");

// Declaración de botones
const btnAgregar = document.getElementById("btnAgregar");
const btnClear = document.getElementById("btnClear");

// Declaración de las alertas
const alertValidaciones = document.getElementById("alertValidaciones");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");

const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);

const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");

// Contador
let cont = 0;
let costoTotal = 0;
let totalEnProductos = 0; 


// Number
// Validar que sea numérico
function validarCantidad() {
    if (txtNumber.value.length == 0) {
        return false;
    } // Tenga info

    if (isNaN(txtNumber.value)) {
        return false;
    } // Tiene que ser un número

    if (Number(txtNumber.value) <= 0) {
        return false;
    }// Mayor que 0

    return true;
} // ValidarCantidad

function getPrecio() {
    return Math.round(Math.random() * 10000) / 100;
} // getPrecio


// click del botón
btnAgregar.addEventListener("click", function (event) {
    event.preventDefault();
    let isValid = true; // Bandera
    // Para limpiar alertas
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";
    // Para limpiar color de border 
    txtName.style.border = "";
    txtNumber.style.border = "";

    // Name
    // Validar que tenga información mínimo 3 letras
    if (txtName.value.length < 3) {
        // Mensaje de error
        txtName.style.border = "medium red solid";
        alertValidacionesTexto.innerHTML = "<strong>Por favor ingresa un nombre de producto válido</strong><br>";
        alertValidaciones.style.display = "block";
        isValid = false; // Bandera
    } // Menor que 3

    // Number
    if (!validarCantidad()) {
        // Mensaje de error
        txtNumber.style.border = "medium red solid";
        alertValidacionesTexto.innerHTML += "<strong>Proporciona la cantidad correcta</strong>";
        alertValidaciones.style.display = "block";
        isValid = false; // Bandera
    } // ! validarCantidad

    if (isValid) {
        // Agregar los elementos a la tabla
        cont++;
        let precio = getPrecio();
        let row = `<tr>
                    <td>${cont}</td>
                    <td>${txtName.value}</td>
                    <td>${txtNumber.value}</td>
                    <td>${precio}</td>
                </tr>
        `;
        cuerpoTabla.insertAdjacentHTML("beforeend", row);

        // Conteo del "Resumen" - Por tipo de producto
        contadorProductos.innerText = cont; 

        // Conteo de cantidad de productos - total
        totalEnProductos += Number(txtNumber.value);
        productosTotal.innerText = totalEnProductos;

        // Precio total del resumen, tomando en cuenta la cantidad de cada producto
        costoTotal += Number(precio*txtNumber.value);
        precioTotal.innerText = new Intl.NumberFormat("es-MX", {style: "currency", currency: "MXN"}).format(costoTotal);

        txtName.value = "";
        txtNumber.value = "";
        txtName.focus(); // Con este automáticamente despues de limpia, regresa el cursor al campo del nombre
    } // isValid

}); // btnAgregar
