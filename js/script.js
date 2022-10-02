document.addEventListener("DOMContentLoaded", () => {
  btnEntry.disabled = true;
  btnAceptMount.disabled = true;
  btnGasto.disabled = true;
});

const btnEntry = document.getElementById("entry");
/* spinner */

const spinner = `<div class="spinner">
<div class="rect1"></div>
<div class="rect2"></div>
<div class="rect3"></div>
<div class="rect4"></div>
<div class="rect5"></div>
</div>`;

/* container bienvenida  */

const contWelcome = document.getElementById("welcome");

/* toma el nombre del Usuario  */
const user = document.getElementById("username");
const alerta = document.getElementById("alert");
const alertaTwo = document.getElementById("alertaTwo");
user.addEventListener("change", () => {
  btnEntry.disabled = false;
  btnEntry.classList.add("success");
});

/* coloca el nombre del Usuario */

const username = document.getElementById("name_user");

/* toma el contenedor principal */

const main = document.getElementById("main");

/* toma el presupuesto */
const loginUser = document.querySelector(".login_user");
const presupuesto = document.getElementById("presupuesto");
let total = document.getElementById("total");
const btnAceptMount = document.getElementById("aceptMount");

presupuesto.addEventListener("change", () => {
  btnAceptMount.disabled = false;
  btnAceptMount.classList.add("success");
});

/* ultimo menu */

const operationMenu = document.getElementById("operationsMenu");

/* ingreso de datos */
const contDatos = document.getElementById("datos");
const nameDato = document.getElementById("name");
const numberDato = document.getElementById("number");
btnGasto = document.getElementById("btn__gasto");

/* funcion inicial */
function entry() {
  if (user.value != "") {
    username.textContent = user.value;

    let newSpinner = document.createElement("div");

    newSpinner.innerHTML = spinner;

    contWelcome.append(newSpinner);

    setTimeout(() => {
      see(main, contWelcome);
    }, 2000);
  } else {
    alerta.classList.add("red");
    alerta.textContent = "Debe ingresar un nombre ";
    setTimeout(() => {
      alerta.textContent = " ";
      alerta.classList.remove("red");
    }, 2000);
  }
}

/* verifica la clase oculta un menu y muestra otro  */
function see(opcion, opcionTwo) {
  if (opcion.classList.contains("d-none")) {
    opcion.classList.remove("d-none");

    opcionTwo.classList.add("d-none");
  } else {
    opcion.classList.add("d-none");
    opcionTwo.classList.remove("d-none");
  }
}

/* cambia en tiempo real el presupuesto  */

function changeMount() {
  total.textContent = presupuesto.value;
  total.value = presupuesto.value;
}

/*  carga el menu Final  */

function loadMenu() {
  see(loginUser, operationMenu);
  setHtmlDatos();
}

/* array de gastos  */
let gastos = [];
/* contador que aumentara dandole el ID al gasto  */
let contador = 1;

/* crea el gasto y lo ingresa al array de gastos */

nameDato.addEventListener("change", () => {
  numberDato.addEventListener("change", () => {
    btnGasto.disabled = false;
    btnGasto.classList.add("success");
  });
});
function setGasto() {
  /* objeto gasto  */

  if (nameDato.value.length != 0 && numberDato.value.length != 0) {
    let gasto = {
      id: contador,
      nombre: nameDato.value,
      importe: numberDato.value,
    };

    gastos.push(gasto);

    /* incrementa el valor del contador para darle un nuevo ID  */
    contador++;

    nameDato.value = "";
    numberDato.value = "";

    /* function que muestra los gastos en pantalla  */
    setHtmlDatos();
  } else {
    alertaTwo.textContent = "Debe completar los campos";
    alertaTwo.classList.add("red");
    setTimeout(() => {
      alertaTwo.textContent = "";
      alertaTwo.classList.remove("red");
    }, 1200);
  }
}

/* setea los datos en pantalla   */

function setHtmlDatos() {
  contDatos.innerHTML = "";

  if (gastos.length != 0) {
    gastos.forEach((dato) => {
      contDatos.innerHTML += `<div class="dato">
      <p class="name__dato">${dato.nombre} </p>
      <p class="price__dato">$ ${dato.importe} </p>
 
      <button class= "cross"  onclick= "deleteGasto(${dato.id} )" >     <i class="fa-solid fa-circle-xmark"></i></button>
  </div>`;
    });

    setTotal();
  } else {
    contDatos.innerHTML = `<p> Aun no hay gastos </p>`;
  }
}

function totalGastos() {
  let gastosTotales = 0;
  for (let gasto of gastos) {
    gastosTotales += parseInt(gasto.importe);
  }

  return gastosTotales;
}

let emoji = document.querySelector(".emoji");

function setTotal() {
  let totalView = parseInt(total.value);

  total.textContent = totalView - totalGastos();
  if (total.textContent < 0) {
    emoji.innerHTML = "&#128546";
  } else {
    emoji.innerHTML = "&#129297";
  }
}

function deleteGasto(gastoId) {
  console.log(gastoId);
  console.log(gastos);
  gastos = gastos.filter((gasto) => gasto.id != gastoId);

  setHtmlDatos();
  setTotal();
}
