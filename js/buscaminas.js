let buscaminas = (function () {
        let tablero= [],
        tableroSolucion= [],
        tableroBandera=[],
        casillasResultanteA= [],
        filas= 0,
        columnas= 0,
        minas= 0,
        nivel= "",
        //guardo casillas 
        casillaPulsada= [],
        casillaVacia= new Set(),
        nuevacasillaVacia=[],
        casillasResultante= 0,
        //bandera
        pulsada= [],
        sumarBanderas= 0;


       function init() {
            crearTableros();
            crearMinas();
            mostrar();
        }
       function reiniciar() {
            filas = 0;
            columnas = 0;
            minas = 0;
            numBanderas = 0;
        }
       function mostrar() {
            console.log("Tablero Descubierto - Pruebas");
            console.table(tableroSolucion);
        }

        function picar(x, y) {
            try {
                if (tableroSolucion[x][y] === "x") {
                    return buscaminasGui.descubrirMinas();
                }
                descrubirCeros(x, y);
                pulsada[x][y] = true;
                actualizaTablero();
                casillaPulsada.push(x + "-" + y);
                comprobarVictoria();
            } catch (e) {
                console.error(e.message);

            }
        }
        function marcar(x, y) {
            try {
                if (tableroBandera[x][y] !== "B" && pulsada[x][y] == false) {
                    tableroBandera[x][y] = "B"
                    return true;
                } else if (tableroBandera[x][y] === "B") {
                    tableroBandera[x][y] = "";
                    return false;
                }

            } catch (e) {
                console.log(e.message);
            }
        }
        function despejar(i, z) {
            casillaVacia.clear();
            sumarBanderas = 0;
            if (contarBanderas(i, z) === tablero[i][z]) {
                for (let j = Math.max(i - 1, 0); j <= Math.min(i + 1, filas - 1); j++)
                    for (let k = Math.max(z - 1, 0); k <= Math.min(z + 1, columnas - 1); k++) {
                        if (tableroBandera[j][k] !== "B")
                            picar(j, k);
                    }
            } else {
                
                for (let j = Math.max(i - 1, 0); j <= Math.min(i + 1, filas - 1); j++) {
                    for (let k = Math.max(z - 1, 0); k <= Math.min(z + 1, columnas - 1); k++) {
                        if (tableroBandera[j][k] !== "B" && pulsada[j][k] == false) {
                            casillaVacia.add(j + "-" + k);
                        }
                    }
                }
                console.log(casillaVacia);
            }
            
        }
        function contarBanderas(i, z) {
            for (let j = Math.max(i - 1, 0); j <= Math.min(i + 1, filas - 1); j++) {
                for (let k = Math.max(z - 1, 0); k <= Math.min(z + 1, columnas - 1); k++) {
                    if (tableroBandera[j][k] === "B") {
                        sumarBanderas++;
                    }
                }
            }
            console.log(sumarBanderas);
            return sumarBanderas;
        }
        function comprobarVictoria() {
            if (casillasTotales() === casillasAbiertas()) {
                return true;
            }
        }
        function casillasTotales() {
            let casilla = 0;
            for (let i = 0; i < columnas; i++) {
                for (let j = 0; j < filas; j++) {
                    if (tableroSolucion[i][j] !== "x") {
                        casilla++;
                    }
                }
            }
            return casilla;
        }
        function casillasAbiertas() {
            let casilla = 0;
            for (let i = 0; i < columnas; i++) {
                for (let j = 0; j < filas; j++) {
                    if (pulsada[i][j] === true) {
                        casilla++;
                    }
                }
            }
            return casilla;
        }
        function pedirNivel(dificultad) {
            switch (dificultad) {
                
                case "novato":
                    filas = 8;
                    columnas = 8;
                    minas = 7;
                    numBanderas = 7;
                    break;
                case "principiante":
                    filas = 9;
                    columnas = 9;
                    minas = 15;
                    numBanderas = 15;
                    break;

                case "intermedio":
                    filas = 10;
                    columnas = 10;
                    minas = 20;
                    numBanderas = 20;
                    break;
                case "avanzado":
                    filas = 15;
                    columnas = 15;
                    minas = 50;
                    numBanderas = 50;
                    break;
                default:
                    break;
                case "personalizado":
                    filas = parseInt(document.getElementById("filas").value);
                    columnas = parseInt(document.getElementById("columnas").value);
                    minas = parseInt(document.getElementById("minas").value);
                    numBanderas = parseInt(document.getElementById("minas").value);
                    break;
            }
        }
        function getFila(){
            return filas;
        }
        function getColumna(){
            return columnas;
        }
        function getSumarBanderas(){
            return sumarBanderas;
        }
        function crearTableros() {
            for (let i = 0; i < filas; i++) {
                tablero[i] = [];
                tableroSolucion[i] = [];
                pulsada[i] = [];
                tableroBandera[i] = [];
                casillasResultanteA[i] = [];
                for (let j = 0; j < columnas; j++) {
                    tablero[i][j] = 0;
                    tableroSolucion[i][j] = 0;
                    pulsada[i][j] = false;
                    tableroBandera[i][j] = "";
                    casillasResultanteA[i][j] = false
                }
            }
        }

        function crearMinas() {
            for (let i = 0; i < minas; i++) {
                let fila = Math.floor(Math.random() * (filas - 1 - 0)) + 0;
                let columna = Math.floor(Math.random() * (columnas - 1 - 0)) + 0;

                while (tableroSolucion[fila][columna] === "x") {
                    fila = Math.floor(Math.random() * (filas - 1 - 0)) + 0;
                    columna = Math.floor(Math.random() * (columnas - 1 - 0)) + 0;
                }
                tableroSolucion[fila][columna] = "x";

                for (let j = Math.max(fila - 1, 0); j <= Math.min(fila + 1, filas - 1); j++)
                    for (let k = Math.max(columna - 1, 0); k <= Math.min(columna + 1, columnas - 1); k++)
                        if (tableroSolucion[j][k] !== "x")
                            tableroSolucion[j][k] += 1;
            }
        }

        function descrubirCeros(x, y) {
            if (tableroSolucion[x][y] === 0) {

                for (let j = Math.max(x - 1, 0); j <= Math.min(x + 1, filas - 1); j++)
                    for (let k = Math.max(y - 1, 0); k <= Math.min(y + 1, columnas - 1); k++) {
                        if (pulsada[j][k] === false) {
                            pulsada[j][k] = true;
                            casillaPulsada.push(j + "-" + k);
                            picar(j, k);
                        }
                    }

            }
        }
        function actualizaTablero() {
            for (let i = 0; i < filas; i++) {
                for (let j = 0; j < columnas; j++) {
                    if (pulsada[i][j] == true) {
                        tablero[i][j] = tableroSolucion[i][j];
                    }
                }
            }
        }
        function getCasillaVaciaLength(){
            return casillaVacia.length;
        } 
    
    return {
        init: init,
        columnas:getColumna,
        filas: getFila,
        nuevacasillaVacia:nuevacasillaVacia,
        getCasillaVaciaLength:getCasillaVaciaLength,
        sumarBanderas:getSumarBanderas,
        casillaVacia:casillaVacia,
        casillaPulsada:casillaPulsada,
        pulsada:pulsada,
        tableroBandera:tableroBandera,
        tableroSolucion:tableroSolucion,
        casillasResultanteA:casillasResultanteA,
        reiniciar: reiniciar,
        picar: picar,
        mostrar: mostrar,
        marcar: marcar,
        despejar: despejar,
        contarBanderas: contarBanderas,
        comprobarVictoria: comprobarVictoria,
        casillasTotales: casillasTotales,
        casillasAbiertas: casillasAbiertas,
        pedirNivel: pedirNivel,
        crearTableros: crearTableros,
        crearMinas: crearMinas,
        descrubirCeros: descrubirCeros,
        actualizaTablero: actualizaTablero
       
    }
})();
