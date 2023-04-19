/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */




const btnAgregar = document.getElementById("btnAgregar");
const contenedorCampos = document.getElementById("contenedorCampos");
const contenedorUni = document.getElementById("contenedorUni");
const contenedorMulti = document.getElementById("contenedorMulti");
//Matriz que contendrá los datos leídos en los input-text
let matrizDatos = [];
let nuevaMatrizDatos;

btnAgregar.addEventListener("click", function add() {
  const divCampos = document.createElement("div");

  for (let i = 1; i <= 3; i++) {
    const inputCampo = document.createElement("input");
    inputCampo.type = "text";
    inputCampo.name = `campo${i}`;
    var input = "";
    switch (i) {

      case 1: input = "Input Process ID";
        break;
      case 2: input = "Input CPU Time";
        break;

      case 3: input = "Input I/O Time";
        break;
    }

    inputCampo.placeholder = input;
    divCampos.appendChild(inputCampo);
  }

  contenedorCampos.appendChild(divCampos);
});



btnLeer.addEventListener("click", function read() {
  const camposTexto = document.querySelectorAll("input[type=text]");

  const filaTabla = document.createElement("tr");
  const celdaIdProceso = document.createElement("td");
  const celdaTiempoCPU = document.createElement("td");
  const celdaTiempoIO = document.createElement("td");

  let filas = camposTexto.length / 3;
  let col = 0;
  let j = 0;

  for (let i = 0; i < filas; i++) {
    matrizDatos[i] = [];
    matrizDatos[i][j] = camposTexto[col].value;
    matrizDatos[i][j + 1] = camposTexto[col + 1].value;
    matrizDatos[i][j + 2] = camposTexto[col + 2].value;
    col += 3;


  }
  //window.alert("The data read dynamically in the input-text is loaded into an array named matrizDatos of size nx3. \n You can use this array to solve your requirements. ");
  console.log(matrizDatos);
  console.log("+´++++++++++++++++++")
  createTable(matrizDatos);
  nuevaMatrizDatos = nuevaMatriz(matrizDatos)
  console.log(nuevaMatrizDatos)

});


btnCambiar.addEventListener("click", function () {
  nuevaMatrizDatos = nuevaMatriz(matrizDatos)
  uniProgramming();
  multiProgramming();

})

function createTable(matrix) {
  let table = '<table border="1" align="center"><thead><tr><th>ID </th><th>CPU Time</th><th>I/O Time</th></tr></thead><tbody>';
  for (let i = 0; i < matrix.length; i++) {
    table += '<tr><td>' + matrix[i][0] + '</td><td>' + matrix[i][1] + '</td><td>' + matrix[i][2] + '</td></tr>';
  }
  table += '</tbody></table>';
  document.getElementById('tabla').innerHTML = table;

}



btnUni.addEventListener("click", uniProgramming);
function uniProgramming() {
  const nuevoParrafo = document.createElement("table");

  unipTable(nuevaMatrizDatos);

  const textoParrafo = document.createTextNode(porcentajeUsoUniP() + "% Es el porcentaje de tiempo de uso");
  nuevoParrafo.appendChild(textoParrafo);
  contenedorUni.appendChild(nuevoParrafo);

}

btnMulti.addEventListener("click", multiProgramming);
function multiProgramming() {
  const nuevoParrafo = document.createElement("table");


  console.log(nuevaMatrizDatos)
  const matrizDiagrama = matrizMultip(nuevaMatrizDatos);
  multipTable(matrizDiagrama)


  const textoParrafo = document.createTextNode(porcentajeUsoMultip(matrizDiagrama) + "% Es el porcentaje de tiempo de uso");
  nuevoParrafo.appendChild(textoParrafo);
  contenedorMulti.appendChild(nuevoParrafo);
}

function unipTable(matriz) {

  let table = '<table border="1" align="center"<thead><th>ID</th></thead><tbody>';


  let suma = 0

  for (let i = 0; i < matriz.length; i++) {
    table += '<tr><td style= "width: 25px; height: 25px;">' + matrizDatos[i][0] + '</td>';

    //preRelleno del tiempo de ocio
    if (i != 0) {
      suma += matriz[i - 1].length

      for (let k = 0; k < suma; k++) {
        table += '<td style="background-color: gray; width: 25px; height: 25px;"></td>';

      }
    }
    // Relleno del tiempo de CPU y de I/O
    for (let j = 0; j < matriz[i].length; j++) {

      if (matriz[i][j] == 1) {

        table += '<td style="background-color: green; width: 25px; height: 25px;"></td>';
      } else {
        table += '<td style="background-color: beige; width: 25px; height: 25px;"></td>';
      }
    }


    //postRelleno tiempo de ocio
    if (matriz[i + 1] != undefined) {
      let s = 0
      for (let k = i + 1; k < matriz.length; k++) {
        s += matriz[k].length

      }

      for (let k = 0; k < s; k++) {
        table += '<td style="background-color: gray;  width: 25px; height: 25px;"></td>';
      }
    }


    table += '</tr>';



  }
  table += '</tbody></table>';

  document.getElementById('contenedorUni').innerHTML = table;
}


function porcentajeUsoUniP() {
  let tCPUtime = 0;
  let tRealTime = 0;
  for (let i = 0; i < matrizDatos.length; i++) {
    tCPUtime += parseInt(matrizDatos[i][1])
    for (let k = 0; k < matrizDatos[i].length - 1; k++) {
      tRealTime += parseInt(matrizDatos[i][k + 1]);

    }
  }


  let tiempoUso = (tCPUtime / tRealTime) * 100;

  return tiempoUso.toFixed(2);
}


function mezclar(array) {



  for (let i = array.length - 2; i > 1; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    if (j != 0 && j != (array.length - 1)) {
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  console.log(array)
  return array;

}


function nuevaMatriz() {
  let newMatriz = [];


  
    let tCPU;
  let tIO;
  for (let i = 0; i < matrizDatos.length; i++) {
    let arreglo = [];

    tCPU = parseInt(matrizDatos[i][1]);
    tIO = parseInt(matrizDatos[i][2]);

    if (tCPU < 2) {
      document.getElementById('alerta').innerHTML = " CPU time must be greater than or equal to 2"
      return arreglo;
    }
    document.getElementById('alerta').innerHTML ="";
    arreglo[0] = 1
    arreglo[tCPU + tIO - 1] = 1



    if (tCPU == 2) {


      for (let j = 1; j < arreglo.length - 1; j++) {
        arreglo[j] = 0;

      }
    } else {
      let contador = 1
      for (let j = 1; j <= tCPU - 2; j++) {
        arreglo[j] = 1
        contador++
      }
      for (let j = 0; j < tIO; j++) {
        arreglo[contador + j] = 0;
      }

      arreglo = mezclar(arreglo);

    }

    newMatriz[i] = arreglo
  }
  

  return newMatriz;

}

function multipTable(matriz) {

  let table = '<table border="1" align="center"<thead><th>ID</th></thead><tbody>';
  console.log(matriz)
  for (let i = 0; i < matriz.length; i++) {
    table += '<tr><td style= "width: 25px; height: 25px;">' + matrizDatos[i][0] + '</td>';



    for (let j = 0; j < matriz[i].length; j++) {

      if (matriz[i][j] == 1) {
       

        table += '<td style="background-color: green; width: 25px; height: 25px;"></td>';
      } else if (matriz[i][j] == 0) {
        table += '<td style="background-color: beige; width: 25px; height: 25px;"></td>';
      }
      else if (matriz[i][j] == "-") {
        table += '<td style="background-color: gray; width: 25px; height: 25px;"></td>';

      } else if (matriz[i][j] == "a0") {
        table += '<td style="background-color: beige; width: 25px; height: 25px;"></td>';

      }


    }

    //postRelleno tiempo de ocio
    if (matriz[i + 1] != undefined) {
      let tamanio = matriz.length
      tamanio = matriz[tamanio - 1].length;
      let resta = tamanio - matriz[i].length
      for (let k = 0; k < resta; k++) {
        table += '<td style="background-color: gray;  width: 25px; height: 25px;"></td>';
      }
    }
    table += '</tr>';



  }
  table += '</tbody></table>';
  document.getElementById('contenedorMulti').innerHTML = table;



}

function matrizMultip(matriz) {

  const matrizMultip = []

  let contador

  for (let i = 0; i < matriz.length; i++) {
    let fila = [];

    if (i == 0) {

      for (let j = 0; j < matriz[i].length; j++) {
        fila[j] = matriz[i][j];


      }



    } else {
      console.log(i)

      console.log(matrizMultip[i - 1])
      let k = 0;
      for (let j = 0; j < matriz[i].length;) {



        console.log(matriz[i][j] + " indice : " + j)


        console.log(matrizMultip[i - 1][k] + " fila anterior")
        if (matrizMultip[i - 1][k] == undefined) {
          fila[k] = matriz[i][j]
          j++
        }
        else if (matriz[i][j] == 1 && matrizMultip[i - 1][k] == 1) {
          fila[k] = "-"
          console.log("agrego un:- ")

        }
        else if (matriz[i][j] == 1 && matrizMultip[i - 1][k] == "-") {
          fila[k] = "-"
          console.log("agrego un: -")

        }
        else if (matriz[i][j] == 1 && matrizMultip[i - 1][k] == 0) {
          fila[k] = 1
          j++
          console.log("agrego un: 1")
        }
        else if (matriz[i][j] == 0 && matrizMultip[i - 1][k] == 0) {
          console.log("agrego un: 0")
          fila[k] = 0
          j++
        }
        else if (matriz[i][j] == 0 && matrizMultip[i - 1][k] == "a0") {
          console.log("agrego un: a0 a")
          fila[k] = "a0"
          j++

        }

        else if (matriz[i][j] == 1 && matrizMultip[i - 1][k] == "a0") {
          console.log("agrego un: -")
          fila[k] = "-"

        }
        else if (matriz[i][j] == 0 && matrizMultip[i - 1][k] == 1) {
          console.log("agrego un: a0 b")
          fila[k] = "a0"
          j++

        }
        else if (matriz[i][j] == 0 && matrizMultip[i - 1][k] == "-") {
          console.log("agrego un: a0 c")
          fila[k] = "a0"
          j++

        }

        k++
        console.log("fila ---> " + fila)



      }

    }

    console.log(fila)
    matrizMultip[i] = fila
    
  }
 
  return matrizMultip;
}

function porcentajeUsoMultip(matriz) {
  let tCPUtime = 0;
  let tRealTime = 0;
  for (let i = 0; i < matrizDatos.length; i++) {
    tCPUtime += parseInt(matrizDatos[i][1])
  }

  tRealTime = matriz.length
  tRealTime = matriz[tRealTime - 1].length;

  let porcentaje = tCPUtime/tRealTime *100;
  return porcentaje.toFixed(2);
}





