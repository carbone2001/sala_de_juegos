import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';
import { EstadisticasService } from 'src/app/services/estadisticas.service';

@Component({
  selector: 'app-memotest',
  templateUrl: './memotest.component.html',
  styleUrls: ['./memotest.component.scss']
})
export class MemotestComponent implements OnInit {

  //Animaciones
  imgSize = 400 // (%)
  opacity = 0; // [0-1]
  estilosAnimaciones = "background-size: " + this.imgSize + "%;opacity: " + this.opacity + ";background-image: url('assets/imagenMemotest.jpg');";

  constructor(
    public dialog: MatDialog,
    public estadisticas: EstadisticasService
  ) {
    this.AnimacionDeInicio();
   }

  opcionesElegidas = { "opcion1": 0, "opcion2": 0, "cantidad": 0 };

  iconos = [
    { "nombre": "android", "asignaciones": 0 },
    { "nombre": "alarm", "asignaciones": 0 },
    { "nombre": "camera_enhance", "asignaciones": 0 },
    { "nombre": "favorite", "asignaciones": 0 },
    { "nombre": "language", "asignaciones": 0 },
    { "nombre": "music_video", "asignaciones": 0 },
    { "nombre": "volume_up", "asignaciones": 0 },
    { "nombre": "stay_current_portrait", "asignaciones": 0 }
  ]

  posiciones = [
    { "icono": "", "visible": false },
    { "icono": "", "visible": false },
    { "icono": "", "visible": false },
    { "icono": "", "visible": false },
    { "icono": "", "visible": false },
    { "icono": "", "visible": false },
    { "icono": "", "visible": false },
    { "icono": "", "visible": false },
    { "icono": "", "visible": false },
    { "icono": "", "visible": false },
    { "icono": "", "visible": false },
    { "icono": "", "visible": false },
    { "icono": "", "visible": false },
    { "icono": "", "visible": false },
    { "icono": "", "visible": false },
    { "icono": "", "visible": false }
  ]

  ngOnInit(): void {
    this.AsignarIconos();
    this.estadisticas.ObtenerEstadisticasUsuario('memotest');
  }

  AnimacionDeInicio()
  {
    var ciclos = 100;
    var intervalo = setInterval(()=>{
      this.imgSize -= 1;
      this.opacity += 0.01;
      ciclos--;
      this.estilosAnimaciones = "background-size: "+this.imgSize+"%;opacity: "+this.opacity+";background-image: url('assets/imagenMemotest.jpg');";
      if(ciclos <= 0)
      {
        clearInterval(intervalo);
      }
    },5);
  }

  AsignarIconos() {
    var indiceIconoAleatorio;
    var iconosValidos;
    this.posiciones.forEach(element => {
      iconosValidos = this.iconos.map((icono, index) => {
        var newObjIcon = JSON.parse(JSON.stringify(icono));
        //Necesi agregar el index de la lista de iconos original
        //para poder cambiar la asignacion al utilizar uno de los
        //iconos de el array filtrado. 
        newObjIcon.index = index;
        return newObjIcon;
      }).filter((icono) => {
        return icono.asignaciones < 2;
      });
      indiceIconoAleatorio = Math.round(Math.random() * ((iconosValidos.length - 1) - 0) + 0);
      element.icono = iconosValidos[indiceIconoAleatorio].nombre;
      this.iconos[iconosValidos[indiceIconoAleatorio].index].asignaciones++;
    });
  }

  ElegirOpcion(indice) {
    if (this.posiciones[indice].visible == false && this.opcionesElegidas.cantidad != 2) {
      this.posiciones[indice].visible = true;
      var icono1;
      var icono2;
      var opcionesDisponibles;
      if (this.opcionesElegidas.cantidad == 1) {
        this.opcionesElegidas.opcion2 = indice;
        icono1 = this.posiciones[this.opcionesElegidas.opcion1].icono;
        icono2 = this.posiciones[this.opcionesElegidas.opcion2].icono;
        console.log("Opciones elegidas:", this.opcionesElegidas);
        if (icono1 == icono2) {
          this.opcionesElegidas.cantidad = 0;
          this.opcionesElegidas.opcion1 = 0;
          this.opcionesElegidas.opcion2 = 0;
        }
        else {
          setTimeout(() => {
            this.posiciones[this.opcionesElegidas.opcion1].visible = false;
            this.posiciones[this.opcionesElegidas.opcion2].visible = false;
            console.log(this.posiciones);
            console.log(this.opcionesElegidas);
            this.opcionesElegidas.cantidad = 0;
            this.opcionesElegidas.opcion1 = 0;
            this.opcionesElegidas.opcion2 = 0;
          }, 200);
          //console.log("No ha encontrado coincidencia!")
        }

      }
      else {
        this.opcionesElegidas.opcion1 = indice;
        this.opcionesElegidas.cantidad++;
        console.log("Opciones elegidas:", this.opcionesElegidas);
      }
      opcionesDisponibles = this.posiciones.filter((posicion) => {
        return posicion.visible != true;
      })
      if (opcionesDisponibles.length == 0) {
        this.estadisticas.usuario.memotest.puntuacion += 1;
        this.estadisticas.CargarEstadisticasUsuario('memotest',this.estadisticas.usuario.memotest.puntuacion)
        this.OpenDialog("partida ganada!", "Felicidades!");
        this.ReiniciarJuego();
      }
      //console.log("Array posiciones: ",this.posiciones);
    }
  }

  ReiniciarJuego() {
    this.posiciones = this.posiciones.map((element) => {
      element.visible = false;
      element.icono = "";
      return element;
    });
  }

  OpenDialog(mensaje: string, cabezera: string) {
    this.dialog.open(DialogAlert, {
      data: { mensaje: mensaje, cabezera: cabezera }
    });
  }
}


@Component({
  templateUrl: 'dialogAlert.html',
  selector: "dialogAlert"
})
export class DialogAlert {
  constructor(
    public dialogRef: MatDialogRef<DialogAlert>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  CloseDialog() {
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}