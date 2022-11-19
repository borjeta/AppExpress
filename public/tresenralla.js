let turno = 1;
let fichas = ["O", "X"];
let puestas = 0;
let partidaAcabada = false;
let puntosJugador = 0;
let puntosMaquina = 0;
let partidasJugadas = 0;
let haGanadoJugador = false;
let haGanadoMaquina = false;
let textoVictoria = document.getElementById("textoVictoria");
//Botones menú
let btnIniciar = document.getElementById("iniciar");
let btnReiniciar = document.getElementById("resetGame");
let btnReset = document.getElementById("reset");
let btnMuestraDatos = document.getElementById("muestraDatos");
let btnGuardaDatos = document.getElementById("guardarDatos");
let btnCargarDatos = document.getElementById("cargarDatos");
let btnSalir = document.getElementById("salir");
let btnSiguientePartida = document.getElementById("siguientePartida");

let campoPartidasMaximas = document.getElementById("partidasMaximas");

let tablero = document.getElementById("tablero");
let empates = 0;
let botones = Array.from(document.getElementsByName("botonesJuego"));

//Arranque por defecto al iniciar
btnCargarDatos.style.visibility = "hidden";
btnGuardaDatos.style.visibility = "hidden";
btnMuestraDatos.style.visibility = "hidden";
btnReset.style.visibility = "hidden";
btnSiguientePartida.style.visibility = "hidden";
btnReiniciar.style.visibility = "hidden";

//addEventListener para los botones del menu
btnReiniciar.addEventListener("click", reiniciarJuego);
btnReset.addEventListener("click", reiniciarJuego);
btnMuestraDatos.addEventListener("click", muestraDatos);

btnIniciar.addEventListener("click", function () {
  if (
    campoPartidasMaximas.value != "" &&
    campoPartidasMaximas.value != 0 &&
    campoPartidasMaximas.value != null &&
    nombre != "" && 
    (campoPartidasMaximas.value%2 != 0))
   {
    nombre = document.getElementById("nombre").value;
    document.getElementById("tablero").style.visibility = "visible";
    btnIniciar.style.visibility = "hidden";
    btnReiniciar.style.visibility = "visible";
    btnMuestraDatos.style.visibility = "visible";
    btnGuardaDatos.style.visibility = "visible";
    btnCargarDatos.style.visibility = "visible";
    btnSiguientePartida.style.visibility = "hidden";

    document.getElementById("puntosJugador").innerHTML = puntosJugador;
    document.getElementById("partidasJugadas").innerHTML = partidasJugadas;
    document.getElementById("puntosMaquina").innerHTML = puntosMaquina;
    document.getElementById("empates").innerHTML = empates;
    btnReset.style.visibility = "visible";
    botones.forEach((x) => x.addEventListener("click", ponerFicha));

    alert(
      "Bienvenido " +
        nombre +
        " a tres en ralla avanzado\n" +
        "El objetivo del juego es conseguir 3 fichas en linea, ya sea en horizontal, vertical o diagonal.\n" +
        "Para empezar a jugar escriba su nombre y la cantidad de partidas (Impares) SUERTE!\n" +
        "Elige una casilla para empezar"
    );
  } else {
    alert("Introduce un nombre del jugador y un numero de partidas impar");
  }
});
btnSiguientePartida.addEventListener("click", function () {
  botones.forEach((x) => {
    x.innerHTML = "";
    x.style.backgroundColor = "white";
    x.disabled = false;
  });
  textoVictoria.innerHTML = "";
  partidaAcabada = false;
  btnSiguientePartida.style.visibility = "hidden";
  puestas = 0;
  haGanadoJugador = false;
  haGanadoMaquina = false;
  btnGuardaDatos.style.visibility = "hidden";
  btnMuestraDatos.style.visibility = "hidden";
});

btnGuardaDatos.addEventListener("click", function () {
  if (typeof Storage !== "undefined") {
    // LocalStorage disponible
    localStorage.setItem("partidasJugadas", partidasJugadas);
    localStorage.setItem("puntosJugador", puntosJugador);
    localStorage.setItem("empates", empates);
    localStorage.setItem("puntosMaquina", puntosMaquina);
    localStorage.setItem("partidasMaximas", partidasMaximas);
    alert("LocalStorage disponible y se han guardado los datos");
  } else {
    // LocalStorage no soportado en este navegador
    alert("LocalStorage no disponible , no se ha podido guardar los datos");
  }
});

btnCargarDatos.addEventListener("click", function () {
  if (typeof Storage !== "undefined") {
    partidasJugadas = localStorage.getItem("partidasJugadas");
    puntosJugador = localStorage.getItem("puntosJugador");
    empates = localStorage.getItem("empates");
    puntosMaquina = localStorage.getItem("puntosMaquina");
    partidasMaximas = localStorage.getItem("partidasMaximas");

    document.getElementById("puntosJugador").innerHTML = puntosJugador;
    document.getElementById("partidasJugadas").innerHTML = partidasJugadas;
    document.getElementById("empates").innerHTML = empates;
    document.getElementById("puntosMaquina").innerHTML = puntosMaquina;
    document.getElementById("partidasMaximas").innerHTML = partidasMaximas;
    alert("LocalStorage disponible y se han cargado los datos");
  } else {
    alert("LocalStorage no disponible , no se ha podido cargar los datos");
  }
});

btnSalir.addEventListener("click", function () {
  localStorage.clear();
  window.open("", "_self", "");
  window.close();
});

//Funcion para muestraDatos
function muestraDatos() {
  let datos = document.getElementById("datosPartida");
  // si esta oculto lo muestra y si esta visible lo oculta
  if (datos.style.visibility == "hidden") {
    datos.style.visibility = "visible";
    document.getElementById("puntosJugador").innerHTML = puntosJugador;
    document.getElementById("partidasJugadas").innerHTML = partidasJugadas;
    document.getElementById("empates").innerHTML = empates;
  } else {
    document.getElementById("datosPartida").style.visibility = "hidden";
  }
} //Funcion para resetear contadores
function resetear() {
  partidasJugadas = 0;
  puntosJugador = 0;
  empates = 0;
  document.getElementById("puntosJugador").innerHTML = puntosJugador;
  document.getElementById("partidasJugadas").innerHTML = partidasJugadas;
  document.getElementById("empates").innerHTML = empates;
}

//Funcion para reiniciar el juego
function reiniciarJuego() {
  textoVictoria.style.visibility = "hidden";
  botones.forEach((x) => {
    x.innerHTML = "";
    x.style.backgroundColor = "white";
    x.addEventListener("click", ponerFicha);
    x.disabled = false;
  });
  partidaAcabada = false;
  puestas = 0;
  turno = 1;
  document.getElementById("puntosJugador").innerHTML = 0;
  document.getElementById("puntosMaquina").innerHTML = 0;
  document.getElementById("partidasJugadas").innerHTML = 0;
  document.getElementById("empates").innerHTML = 0;
  puntosJugador = 0;
  puntosMaquina = 0;
  partidasJugadas = 0;
  empates = 0;
  estadoPartida = 0;
  nEstado = 0;
  resetear();

  btnMuestraDatos.style.visibility = "visible";
  btnGuardaDatos.style.visibility = "visible";
  btnCargarDatos.style.visibility = "visible";
  btnReset.style.visibility = "visible";

  btnSiguientePartida.style.visibility = "hidden";
  btnReiniciar.style.visibility = "hidden";
}

function ponerFicha(event) {
  let botonPulsado = event.target;
  if (botonPulsado.innerHTML == "") {
    botonPulsado.innerHTML = fichas[turno];
    puestas++;
    let estadoPartida = estado();

    if (estadoPartida == 0) {
      //Compruebo por cada movimiento si hay ganador
      cambiarTurno();
      turnoMaquina();
      estadoPartida = estado();
      cambiarTurno();
    } else if (estadoPartida == 1) {
      //Gana jugador
      textoVictoria.innerHTML = "Gana jugador";
      textoVictoria.style.visibility = "visible";
      document.getElementById("puntosJugador").innerHTML = puntosJugador;
      partidaAcabada = true;
    } else if (estadoPartida == 2) {
      //Gana maquina
      textoVictoria.innerHTML = "Gana maquina";
      textoVictoria.style.visibility = "visible";
      document.getElementById("puntosMaquina").innerHTML = puntosMaquina;
      botones.forEach((x) => {
        x.disabled = true;
      });

      partidaAcabada = true;
    } else if (estadoPartida == 3) {
      //Empate
      textoVictoria.innerHTML = "Empate";
      textoVictoria.style.visibility = "visible";
      empates++;
      document.getElementById("empates").innerHTML = empates;
      partidaAcabada = true;
      botones.forEach((x) => {
        x.style.backgroundColor = "yellow";
      });
      mostrarBotonSiguientePartida();
    }
  }
}

function cambiarTurno() {
  if (turno == 1) {
    turno = 0;
  } else {
    turno = 1;
  }
}

function estado() {
  posicionVictoria = 0;
  nEstado = 0;
  function sonIguales(...args) {
    valores = args.map((x) => x.innerHTML);
    if (valores[0] != "" && valores.every((x, i, arr) => x === arr[0])) {
      args.forEach((x) => (x.style.backgroundColor = "green"));
      if (args[0].innerHTML == "X") {
        if (finJuego() == true) {
          finJuego();
        } else {
          nEstado = 1;
          puntosJugador++;
          partidasJugadas++;
          haGanadoJugador = true;
          document.getElementById("puntosJugador").innerHTML = puntosJugador;
          document.getElementById("partidasJugadas").innerHTML =
            partidasJugadas;

          btnReiniciar.style.visibility = "visible";
          btnSiguientePartida.style.visibility = "visible";
          btnSiguientePartida.disabled = false;
          textoVictoria.style.visibility = "visible";
          textoVictoria.style.color = "green";
          mostrarBotonSiguientePartida();
          return true;
        }
      } else if (args[0].innerHTML == "O") {
        nEstado = 2;
        puntosMaquina++;
        partidasJugadas++;
        haGanadoMaquina = true;
        textoVictoria.style.visibility = "visible";
        textoVictoria.innerHTML = "Gana maquina";
        document.getElementById("puntosMaquina").innerHTML = puntosMaquina;
        document.getElementById("partidasJugadas").innerHTML = partidasJugadas;
        mostrarBotonSiguientePartida();
        return true;
      }
      if (puestas == 9 && (valores[0] == "O" || valores[0] == "X")) {
        if (finJuego() == true) {
          finJuego();
        } else {
          nEstado = 3;
          empates++;
          partidasJugadas++;
          document.getElementById("empates").innerHTML = empates;
          document.getElementById("partidasJugadas").innerHTML =
            partidasJugadas;
          textoVictoria.style.visibility = "visible";
          textoVictoria.innerHTML =
            "Has empatedo la partida contra la maquina" + nombreJugador;
          btnSiguientePartida.disabled = false;
          botones.forEach((x) => {
            x.disabled = true;
          });
          mostrarBotonSiguientePartida();
          return true;
        }
      }
      return false;
    }
    return false;
  }

  //Busca el lleno sin victoria  esto es el empate
  // y nsi busca donde esta el disable de los botones es con victoria

  //Comprobamos si hay alguna linea
  if (sonIguales(botones[0], botones[1], botones[2])) {
    posicionVictoria = 1;
  } else if (sonIguales(botones[3], botones[4], botones[5])) {
    posicionVictoria = 2;
  } else if (sonIguales(botones[6], botones[7], botones[8])) {
    posicionVictoria = 3;
  } else if (sonIguales(botones[0], botones[3], botones[6])) {
    posicionVictoria = 4;
  } else if (sonIguales(botones[1], botones[4], botones[7])) {
    posicionVictoria = 5;
  } else if (sonIguales(botones[2], botones[5], botones[8])) {
    posicionVictoria = 6;
  } else if (sonIguales(botones[0], botones[4], botones[8])) {
    posicionVictoria = 7;
  } else if (sonIguales(botones[2], botones[4], botones[6])) {
    posicionVictoria = 8;
  }

  //Comprobamos quien ha ganado
  if (posicionVictoria > 0) {
    //Si la posicion de victoria es mayor que 0, es que hay ganador
    if (turno == 1) {
      nEstado = 1;
    } else if (turno == 0 && nEstado != 1) {
      nEstado = 2;
    }
  } else if (puestas == 9) {
    //Si no hay ganador y se han puesto todas las fichas, es empate
    nEstado = 3;
  }
  finJuego();
  return nEstado;
}

//Funcion para comprobar si hay ganador

function turnoMaquina() {
  function randomizador(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  let valores = botones.map((x) => x.innerHTML);
  let pos = -1;
  let n = randomizador(0, botones.length - 1);
  while (valores[n] != "") {
    n = randomizador(0, botones.length - 1);
  }
  pos = n;
  botones[pos].innerHTML = "O";
  puestas++;
  return pos;
}
//Funcion para cuando acaba una partida se muestre el boton de siguiente partida
function mostrarBotonSiguientePartida() {
  btnSiguientePartida.style.visibility = "visible";
  btnSiguientePartida.disabled = false;
  //Desabilitamos los botonesJuego

  botones.forEach((x) => {
    if (x.disabled == false) {
      x.disabled = true;
    }
  });
}
function compruebaTableroLleno() {
  let valores = botones.map((x) => x.innerHTML);
  if (valores.every((x) => x != "")) {
    return true;
  } else {
    return false;
  }
}

//Funcion para mostrar datos y Fin de Juego
function finJuego() {
  if (campoPartidasMaximas.value == partidasJugadas) {
    if (puntosJugador > puntosMaquina) {
      botones.forEach((x) => (x.disabled = true));
      btnIniciar.style.visibility = "hidden";
      btnSiguientePartida.style.visibility = "hidden";
      document.getElementById("textoVictoria").innerHTML =
        "HAS GANADO EL JUEGO!!!";
      document.getElementById("textoFinDelJuego").style.visibility = "visible";
      document.getElementById("textoFinDelJuego").style.color = "green";
      tablero.style.visibility = "hidden";
      return true;
    } else if (puntosJugador < puntosMaquina) {
      botones.forEach((x) => (x.disabled = true));
      btnIniciar.style.visibility = "hidden";
      btnSiguientePartida.style.visibility = "hidden";
      textoVictoria.innerHTML = "Has perdido el Juego";
      document.getElementById("textoVictoria").innerHTML =
        "HAS PERDIDO EL JUEGO";
      document.getElementById("textoFinDelJuego").innerHTML =
        "Has perdido el Juego";
      document.getElementById("textoFinDelJuego").style.visibility = "visible";
      document.getElementById("textoFinDelJuego").style.color = "red";
      return true;
    } else if (puntosJugador == puntosMaquina) {
      botones.forEach((x) => (x.disabled = true));
      btnIniciar.style.visibility = "hidden";
      textoVictoria.innerHTML = "Has empatado el Juego";
      document.getElementById("textoVictoria").innerHTML =
        "HAS EMPATADO EL JUEGO";
      document.getElementById("textoFinDelJuego").innerHTML =
        "Has empatado el Juego";
      document.getElementById("textoFinDelJuego").style.visibility = "visible";
      document.getElementById("textoFinDelJuego").style.color = "yellow";
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
