var btnVerde = document.querySelector("#verde");
var btnRojo = document.querySelector("#rojo");
var btnAmarillo = document.querySelector("#amarillo");
var btnAzul = document.querySelector("#azul");
var simon = document.querySelector("#simon");
var empezar = document.querySelector("#empezar");
var salida = document.querySelector("#salida");

// variables con los estilos CSS para los cuatro pulsadores en ambos estados: apagado y encendido...
var verdeApagado = "background: #049E03";
var verdeEncendido = "background: #4EFE4E; transform: scale(1.20);";
var rojoApagado = "background: #AE0404";
var rojoEncendido = "background: #FD2D2D; transform: scale(1.20);";
var amarilloApagado = "background: #CAC902";
var amarilloEncendido = "background: #FDFD13; transform: scale(1.20);";
var azulApagado = "background: #0404A6";
var azulEncendido = "background: #4A4AFD; transform: scale(1.20);";

var nivel; // indica el nivel actual
var secuencia; // array con los colores a repetir
var indSec; // índice de la secuencia de colores

// Se programa que cuando se cliqueé el botón "COMENZAR" comienze la partida...
var sonidos = [
  new Audio("/archivospublicos/sounds/1.mp3"),
  new Audio("/archivospublicos/sounds/2.mp3"),
  new Audio("/archivospublicos/sounds/3.mp3"),
  new Audio("/archivospublicos/sounds/4.mp3"),
  new Audio("/archivospublicos/sounds/error1.mp3"),
  new Audio("/archivospublicos/sounds/hasganado.mp3"),
];
empezar.addEventListener("click", comienzaPartida);
let tituloJugador = document.getElementById("tituloJugador");

function comienzaPartida() {
    console.log(tituloJugador.value);
  if (tituloJugador.value != "") {
    empezar.style.cssText = "display: none;"; // se oculta el botón "EMPEZAR"

    resetSimon();
    guardaEnArrayPulsacionAleatoria();
    reproduceSecuencia();

    function resetSimon() {
      nivel = 1;
      secuencia = [];
      indSec = 0;

      btnVerde.style.cssText = verdeApagado;
      btnRojo.style.cssText = rojoApagado;
      btnAmarillo.style.cssText = amarilloApagado;
      btnAzul.style.cssText = azulApagado;

      salida.innerHTML = "NIVEL " + nivel;
    }
    //inserta el color aleatorio en la secuencia de la maquina
    function guardaEnArrayPulsacionAleatoria() {
      var colores = ["verde", "rojo", "amarillo", "azul"];

      secuencia.push(colores[numAleat(0, 3)]);
    }

    function reproduceSecuencia() {
      //Turno maquina
      if (indSec < secuencia.length) {
        enciendeColor();
      } else {
        // Turno del jugador
        indSec = 0;
        simon.addEventListener("click", compruebaPulsacion);
      }

      function enciendeColor() {
        switch (secuencia[indSec]) {
          case "verde":
            btnVerde.style.cssText = verdeEncendido;
            sonidos[0].play();
            break;
          case "rojo":
            btnRojo.style.cssText = rojoEncendido;
            sonidos[1].play();
            break;
          case "amarillo":
            btnAmarillo.style.cssText = amarilloEncendido;
            sonidos[2].play();
            break;
          case "azul":
            btnAzul.style.cssText = azulEncendido;
            sonidos[3].play();
            break;
        }

        setTimeout(apagaColor, 150);
      }

      function apagaColor() {
        switch (secuencia[indSec]) {
          case "verde":
            btnVerde.style.cssText = verdeApagado;
            sonidos[0].play();
            break;
          case "rojo":
            btnRojo.style.cssText = rojoApagado;
            sonidos[1].play();
            break;
          case "amarillo":
            btnAmarillo.style.cssText = amarilloApagado;
            sonidos[2].play();
            break;
          case "azul":
            btnAzul.style.cssText = azulApagado;
            sonidos[3].play();
            break;
        }

        indSec++;
        setTimeout(reproduceSecuencia, 150);
      }

      function compruebaPulsacion(ev) {
        var pulsador = ev.target;

        if (pulsador.id != "simon") {
          if (pulsador.id == secuencia[indSec]) {
            // si esta siendo correcta la secuencia
            enciendePulsador(pulsador.id);
          } else {
            // El usuario ha fallado y pierde la partida
            sonidos[4].play(); 
            btnVerde.style.cssText = rojoEncendido;
            btnRojo.style.cssText = rojoEncendido;
            btnAmarillo.style.cssText = rojoEncendido;
            btnAzul.style.cssText = rojoEncendido;
            salida.innerHTML =
              "HAS PERDIDO.\n\nHas llegado al nivel " +
              nivel +
              ".\n\nHaz clic en EMPEZAR para volver a jugar";
            simon.removeEventListener("click", compruebaPulsacion);
            empezar.style.cssText = "display: block;"; // se vuelve a mostrar el botón "EMPEZAR"
          }
        }

        function enciendePulsador(pulsador) {
          switch (pulsador) {
            case "verde":
              btnVerde.style.cssText = verdeEncendido;
              sonidos[0].play();
              break;
            case "rojo":
              btnRojo.style.cssText = rojoEncendido;
              sonidos[1].play();
              break;
            case "amarillo":
              btnAmarillo.style.cssText = amarilloEncendido;
              sonidos[2].play();
              break;
            case "azul":
              btnAzul.style.cssText = azulEncendido;
              sonidos[3].play();
              break;
          }

          setTimeout(apagaPulsador, 150, pulsador);
        }

        function apagaPulsador(pulsador) {
          switch (pulsador) {
            case "verde":
              btnVerde.style.cssText = verdeApagado;
              break;
            case "rojo":
              btnRojo.style.cssText = rojoApagado;
              break;
            case "amarillo":
              btnAmarillo.style.cssText = amarilloApagado;
              break;
            case "azul":
              btnAzul.style.cssText = azulApagado;
              break;
          }

          indSec++;
          if (indSec == secuencia.length) {
            // Si ya no queda secuencia, Nivel superado
            nivel++;
             // se pasa al siguiente nivel
            salida.innerHTML = "NIVEL " + nivel;
            guardaEnArrayPulsacionAleatoria(); // se añade un nuevo color al final de la secuencia
            indSec = 0;
            simon.removeEventListener("click", compruebaPulsacion); // se elimina el escuchador de evento clic
            setTimeout(reproduceSecuencia, 500); // y se programa que tras un segundo se reproduzca la secuencia, repitiéndose así el proceso
          }
        }
      }
    }

    function numAleat(limInf, limSup) {
      return limInf + Math.floor(Math.random() * (limSup - limInf + 1));
    }
  } else {
    alert("Introduce primero un nombre para jugar");
  }
}
