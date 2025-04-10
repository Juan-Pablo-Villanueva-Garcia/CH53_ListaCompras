let txtName = document.getElementById("Name");
let txtNumber = document.getElementById("Number"); // Cantidad
let btnAgregar = document.getElementById("btnAgregar");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
let alertValidaciones = document.getElementById("alertValidaciones");
let tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody")[0];

let cont = 0;
let costoTotal = 0;
let totalEnProductos = 0;
let datos = new Array(); //almacena los elementos de la tabla

let contadorProductos = document.getElementById("contadorProductos");
let productosTotal = document.getElementById("productosTotal");
let precioTotal = document.getElementById("precioTotal");


function validarCantidad() {
    if (txtNumber.value.trim().length <= 0) {
        return false;
    }

    if (isNaN(txtNumber.value)) {
        return false;
    }

    if (Number(txtNumber.value) <= 0) {
        return false;
    }

    return true;
}

function getPrecio() {
    return Math.round((Math.random() * 10000)) / 100;
}

btnAgregar.addEventListener("click", function (event) {
    event.preventDefault();
    let isValid = true;

    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";
    txtName.style.border = "";
    txtNumber.style.border = "";

    txtName.value = txtName.value.trim();
    txtNumber.value = txtNumber.value.trim();

    if (txtName.value.length < 3) {
        txtName.style.border = "solid medium red";
        alertValidacionesTexto.innerHTML = "<strong>El nombre no es correcto</strong>";
        alertValidaciones.style.display = "block";
        isValid = false;
    }

    if (!validarCantidad()) {
        txtNumber.style.border = "solid medium red";
        alertValidacionesTexto.innerHTML += "<br/><strong>La cantidad no es correcta</strong>";
        alertValidaciones.style.display = "block";
        isValid = false;
    }

    if (isValid) {
        cont++;
        let precio = getPrecio();
        let row = `<tr>
                     <td>${cont}</td>
                     <td>${txtName.value}</td>
                     <td>${txtNumber.value}</td>
                     <td>$${precio}</td>
                   </tr>`;

        let elemento = {
            "cont" : cont,
            "nombre" : txtName.value,
            "cantidad" : txtNumber.value,
            "precio" : precio
        };

        datos.push(elemento);

        localStorage.setItem("datos",JSON.stringify(datos));
        cuerpoTabla.insertAdjacentHTML("beforeend", row);
        costoTotal += precio * Number(txtNumber.value);
        precioTotal.innerText = "$" + costoTotal.toFixed(2);
        totalEnProductos += Number(txtNumber.value);
        productosTotal.innerText = totalEnProductos;
        contadorProductos.innerText = cont;

        let resumen = {
            "cont" : cont,
            "totalEnProductos": totalEnProductos,
            "costoTotal" : costoTotal
        };
        localStorage.setItem("resumen",JSON.stringify(resumen));
        txtName.value = "";
        txtNumber.value = "";
        txtName.focus();
    }// if isValid


});

window.addEventListener("load",function(event){
    event.preventDefault();
    if(this.localStorage.getItem("datos")!=null){
        datos = JSON.parse(this.localStorage.getItem("datos"));
    }//datos != null

    datos.forEach((d) => {
            let row = `<tr>
                    <td>${d.cont}</td>
                    <td>${d.nombre}</td>
                    <td>${d.cantidad}</td>
                    <td>${d.precio}</td>
                    `
            cuerpoTabla.insertAdjacentHTML("beforeend",row);

    })
    
    if(this.localStorage.getItem("resumen")!=null){
        resumen = JSON.parse(this.localStorage.getItem("resumen"));
        costoTotal = resumen.costoTotal;
        totalEnProductos = resumen.totalEnProductos
        cont =  resumen.cont;
    }//resumen != null

   
        precioTotal.innerText = "$" + costoTotal.toFixed(2);
        productosTotal.innerText = totalEnProductos;
        contadorProductos.innerText = cont;
    
}); //Window.addEventListener load

// Agregar funcionalidad de limpiar todo
// Resumen
//Tabla
//Campos
//Alerta
// LocalStorage

let btnClear = document.getElementById("btnClear");

btnClear.addEventListener("click", function () {
    // Limpiar tabla visualmente
    cuerpoTabla.innerHTML = "";

    // Reiniciar variables
    cont = 0;
    costoTotal = 0;
    totalEnProductos = 0;
    datos = [];

    // Actualizar resumen
    contadorProductos.innerText = "0";
    productosTotal.innerText = "0";
    precioTotal.innerText = "$0";

    // Limpiar campos
    txtName.value = "";
    txtNumber.value = "";
    txtName.focus();

    // Ocultar alerta
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";
    txtName.style.border = "";
    txtNumber.style.border = "";

    // Limpiar localStorage
    localStorage.removeItem("datos");
    localStorage.removeItem("resumen");
});