let $final = false;
let contador = 0;

function init() {


   
   $("#elegirNivel").change(buscaminasGui.iniciarJuego);
   $("#reiniciar").click(buscaminasGui.reiniciar);
};

//funtion onclick del boton perzonalizado
function personalizado () {
   $("#elegirNivel").css({
      "display":"none"
   });

   $("#btn2").css({
      "display":"none"
   });

   $("#Perzonalizar").css({
      "display": "none"
   });

   buscaminas.pedirNivel('personalizado');
   buscaminasGui.generarTablero();
}

function crearPersonalizado() {
   //<ostrar los inputs para crear el tablero personalizado
   $("#btn2").css({
      "display":"flex",
      "margin-top":"10px",
      "align-items":"center",
      "flex-direction":"column"

      
   });
}

let buscaminasGui = {
   reiniciar(){
      location.reload();
   },
   iniciarJuego() {
      $("#elegirNivel").css({
         "display":"none"
      });

      $("#Perzonalizar").css({
         "display": "none"
      });
      
      buscaminas.pedirNivel($(this).val());
      buscaminasGui.generarTablero();
   },
   generarTablero() {
      buscaminas.init();
      $("#tablero").css({
         "display": "grid",
         "grid-template-columns": "repeat(" + buscaminas.columnas() + ",1fr)",
         "width": buscaminas.columnas() * 50 + "px",
         "margin": "auto",
      });

      for (let i = 0; i < buscaminas.columnas(); i++) {
         for (let j = 0; j < buscaminas.filas(); j++) {
            let $div = $("<div></div>");

            $div.prop("id", "" + i + "-" + j + "");
            $div.css({
               "background-color": "black",
               "width": "50px",
               "height": "50px",
               "margin": "1px"
            })

            $div.click(function () {
               buscaminasGui.picar(i, j)

            })

            $div.mousedown(function (e) {
               buscaminasGui.marcar(e, i, j);
            })

            $div.mousedown(function (e) {
               buscaminasGui.despejar(e, i, j);
            })

            $("#tablero").append($div);
            //console.log($div);
         }
        
      }
    
   },
   picar(i, j) {
      if ($final == false) {
         if (buscaminas.tableroBandera[i][j] === "B")
            return true;
         else
            buscaminas.picar(i, j);
         buscaminasGui.actualizarTablero();
      }
      if (buscaminas.comprobarVictoria()) {
         $final = true;
         $("#textoFinal").text("¡Has Ganado!");
         setTimeout(function () {
            $('#muestraFinal').show("puff");
         }, 200);
      }
   },
   marcar(e, i, j) {
      if ($final == false) {
         if (e.buttons == 2) {
            let $valorM = $("#" + i + "-" + j)
            buscaminasGui.eliminaMenuContextual();

            if (buscaminas.marcar(i, j)) {
               $valorM.css({
                  "background-color": "blue",
               }).fadeOut("slow", "linear", function () {
                  $(this).fadeIn(700);
               });
            } else {
               if (buscaminas.pulsada[i][j] !== true)
                  $valorM.css({
                     "background-color": "black",
                  }).fadeOut("fast", function () {
                     $(this).fadeIn(400);
                  });
            }

         }
      }
   },
   despejar(e, i, j) {
      if (e.buttons == 3) {
         
         buscaminas.despejar(i, j);
         if (buscaminas.casillaVacia.size> 0) {
            for (const coordenada of buscaminas.casillaVacia ){
               $("#" + coordenada).css({
               }).fadeOut(200, function () {
                  $("#" + coordenada).fadeIn(200);
               });
            }
            
         }
      }
   },
   eliminaMenuContextual() {
      $("#tablero").contextmenu(function (event) {
         event.preventDefault();
      })
   },

   actualizarTablero() {
      for (const coordenada of buscaminas.casillaPulsada) {
         let i = coordenada.split("-")[0];
         let j = coordenada.split("-")[1];
         let $valor = $("#" + i + "-" + j)
         if (buscaminas.tableroSolucion[i][j] === 0)
            $valor.text("");
         else
            $valor.text(buscaminas.tableroSolucion[i][j]);

         $valor.css({
            "background-color": "#CCCCCC",
            "text-align": "center",
            "font-size": "40px",
            "transform": " rotateX(360deg)",
            "transition-duration": "1s"
         });
      }
   },

   descubrirMinas() {
      $("#textoFinal").text("¡Has perdido!");
      setTimeout(function () {
         $('#muestraFinal').show("puff");
      }, 200);
      $final = true;
      let contador = 0;

      for (let i = 0; i < buscaminas.filas(); i++) {
         for (let j = 0; j < buscaminas.columnas(); j++) {
            let $valor = $("#" + i + "-" + j)
            if (buscaminas.tableroSolucion[i][j] === "x") {
               contador += 100;
               if (buscaminas.tableroBandera !== "B") {
                  
                  setTimeout(function () {
                     $valor.css({
                        "background": "red",
                        "transform": "rotate(1000deg)",
                        "transition-duration": "2s"
                     }).animate({
                        height: "50px",
                        width: "50px"
                     }, 1000);
                  }, contador);
               }
            }
         }
      }
   },
}
$(init);
