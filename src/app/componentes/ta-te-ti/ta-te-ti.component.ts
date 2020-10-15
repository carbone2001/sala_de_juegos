import { ɵBrowserPlatformLocation } from '@angular/common';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-ta-te-ti',
  templateUrl: './ta-te-ti.component.html',
  styleUrls: ['./ta-te-ti.component.scss']
})
export class TaTeTiComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }
  filaA = { 1: "", 2: "", 3: "" };
  filaB = ["", "", ""];
  filaC = ["", "", ""];

  //True = opcion disponible
  OpcionesDisponibles = [
    { nombre: "A1", disponible: true, marca: "" },
    { nombre: "A2", disponible: true, marca: "" },
    { nombre: "A3", disponible: true, marca: "" },
    { nombre: "B1", disponible: true, marca: "" },
    { nombre: "B2", disponible: true, marca: "" },
    { nombre: "B3", disponible: true, marca: "" },
    { nombre: "C1", disponible: true, marca: "" },
    { nombre: "C2", disponible: true, marca: "" },
    { nombre: "C3", disponible: true, marca: "" }
  ];

  /*OpcionesDisponibles = [
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true
  ];*/

  OpcionesElegidasComputadora = [];
  OpcionesElegidasUsuario = [];

  SolucionesPosibles = [
    ["A1", "B2", "C3"],
    ["A3", "B2", "C1"],
    ["A1", "A2", "A3"],
    ["B1", "B2", "B3"],
    ["C1", "C2", "C3"],
    ["A1", "B1", "C1"],
    ["A2", "B2", "C2"],
    ["A3", "B3", "C3"]
  ];

  ngOnInit(): void {
  }

  RegistrarOpcion(opcion) {
    if (this.OpcionesElegidasUsuario.find((element) => element == opcion) != opcion && this.OpcionesElegidasComputadora.find((element) => element == opcion) != opcion) {
      var variablesEncontradas = 0;
      var estadoPartida = 'en curso';
      var opcionesRestante = this.OpcionesDisponibles.filter((elemento) => {
        return elemento.disponible;
      });
      //Deshabilitar opcion elegida
      this.OpcionesDisponibles.forEach((e) => {
        if (e.nombre == opcion) {
          e.disponible = false;
          e.marca = "cruz";
        }
      });

      //Agrego la opcion ingresada a la lista de opciones elegidas por el usuario
      this.OpcionesElegidasUsuario.push(opcion);

      console.log(this.SolucionesPosibles);
      if (opcionesRestante.length <= 10)//5 opciones restantes es lo minimo se necesita para que haya un ganador. Pero puede no haberlo, claro...
      {
        for (let i = 0; i < this.SolucionesPosibles.length; i++) {
          //Necesito 3 variables encontradas para que gane el juego
          this.OpcionesElegidasUsuario.forEach(posicion => {
              //Busco si las opciones tomadas por el usuario coinciden con algun patron del array de soluciones
              var resultadoBusqueda = this.SolucionesPosibles[i].find(posicionParam => {
                posicionParam == posicion;
                return posicionParam == posicion;
              })
              console.log('resultadoBusq:', resultadoBusqueda);
              if (resultadoBusqueda == posicion) {
                variablesEncontradas++;
              }
          })
          console.log('variables encontradas:', variablesEncontradas);
          console.log('opciones elegidas por usuario:',this.OpcionesElegidasUsuario);
          if (variablesEncontradas >= 3) {// 3 variables encontradas significa que solo hacer un patron ganador. El cual tiene 3 elementos.
            console.log(this.OpcionesElegidasUsuario);
            this.OpenDialog("Partida ganada!!","Felicidades!");
            estadoPartida = 'ganada';
            this.ReiniciarJuego();
            break;
          } else if (variablesEncontradas < 3) {
            //Reiniciar contador
            variablesEncontradas = 0;
            opcionesRestante = this.OpcionesDisponibles.filter((elemento) => {
              return elemento.disponible;
            });
            //En caso de que no hayan mas opciones, se declara empate. A menos que se encuentre una combinacion ganadora.
            if (opcionesRestante.length == 0) {
              estadoPartida = 'empate';
            }
          }
        }
      }
      if (estadoPartida == 'en curso') {
        this.RespuestaDeLaComputadora();
      }
      else if(estadoPartida ==  'empate')
      {
        this.OpenDialog("La partida termino en empate. Intentalo de nuevo!","Casi...");
        this.ReiniciarJuego();
      }
    }
  }

  ReiniciarJuego() {
    this.OpcionesDisponibles = this.OpcionesDisponibles.map((element) => {
      element.marca = '';
      element.disponible = true;
      return element;
    });
    this.OpcionesElegidasUsuario = [];
    this.OpcionesElegidasComputadora = [];
  }

  RespuestaDeLaComputadora() {
    var variablesEncontradas = 0;
    var estadoPartida = "en curso";
    var opcionesRestante = this.OpcionesDisponibles.filter((elemento) => {
      return elemento.disponible;
    });

    var indiceAleatorio: number = Math.round(Math.random() * ((opcionesRestante.length - 1) - 0) + 0);
    var posicionNombre = opcionesRestante[indiceAleatorio].nombre;

    this.OpcionesDisponibles = this.OpcionesDisponibles.map((element) => {
      if (element.nombre == posicionNombre) {
        element.disponible = false;
        element.marca = "circulo";
      }
      return element;
    });

    this.OpcionesElegidasComputadora.push(posicionNombre);

    if (opcionesRestante.length <= 10)//5 opciones restantes es lo minimo se necesita para que haya un ganador. Pero puede no haberlo, claro...
    {
      for (let i = 0; i < this.SolucionesPosibles.length; i++) {
        //Necesito 3 variables encontradas para que gane el juego
        this.OpcionesElegidasComputadora.forEach(posicion => {
          //Busco si las opciones tomadas por el usuario coinciden con algun patron del array de soluciones
          var resultadoBusqueda = this.SolucionesPosibles[i].find(posicionParam => {
            posicionParam == posicion;
            return posicionParam == posicion;
          })

          if (resultadoBusqueda == posicion) {
            variablesEncontradas++;
          }
        })
        //Reiniciar contador
        if (variablesEncontradas < 3) {
          variablesEncontradas = 0;
          opcionesRestante = this.OpcionesDisponibles.filter((elemento) => {
            return elemento.disponible;
          });
          if (opcionesRestante.length == 0) {
            estadoPartida = "empate";
          }
        }
        else if (variablesEncontradas >= 3) {
          this.OpenDialog("Esta vez la maquina fue mas inteligente. Intentalo de nuevo!","Perdiste!");
          this.ReiniciarJuego();
          break;
        }
      }
    }

    if(estadoPartida == 'empate')
    {
      this.OpenDialog("La partida termino en empate. Intentalo de nuevo!","Casi...");
      this.ReiniciarJuego();
    }


  }

  OpenDialog(mensaje:string,cabezera:string)
  {
    this.dialog.open(DialogAlert, {
      data: {mensaje:mensaje, cabezera:cabezera}
    });
  }
}


@Component({
  templateUrl: 'dialogAlert.html',
  selector:"dialogAlert"
})
export class DialogAlert {
  constructor(
    public dialogRef: MatDialogRef<DialogAlert>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
    CloseDialog()
    {
      this.dialogRef.close();
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}