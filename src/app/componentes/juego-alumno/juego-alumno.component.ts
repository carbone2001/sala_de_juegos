import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-juego-alumno',
  templateUrl: './juego-alumno.component.html',
  styleUrls: ['./juego-alumno.component.scss']
})
export class JuegoAlumnoComponent implements OnInit {
  numerosElegidosUsuario = [
    { "numero": "" },
    { "numero": "" },
    { "numero": "" },
    { "numero": "" },
    { "numero": "" }
  ]
  aciertos = 0;
  puntuacion = 0;

  numerosElegidosComputadora = [];

  //Animaciones
  imgSize = 400 // (%)
  opacity = 0; // [0-1]

  estilosAnimaciones = "background-size: " + this.imgSize + "%;opacity: " + this.opacity + ";background-image: url('assets/imagenJuegoAlumno.jpg');";



  constructor(
    public dialog: MatDialog
  ) {
    this.AnimacionDeInicio();
   }

  AnimacionDeInicio() {
    var ciclos = 100;
    var intervalo = setInterval(() => {
      this.imgSize -= 1;
      this.opacity += 0.01;
      ciclos--;
      this.estilosAnimaciones = "background-size: " + this.imgSize + "%;opacity: " + this.opacity + ";background-image: url('assets/imagenJuegoAlumno.jpg');";
      if (ciclos <= 0) {
        clearInterval(intervalo);
      }
    }, 5);
  }

  ngOnInit(): void {
    this.ElegirNumerosComputadora();
  }

  ElegirNumerosComputadora() {
    this.numerosElegidosComputadora = [];
    for (var i = 0; i < 60; i++) {
      var numeroAleatorio: number = Math.round(Math.random() * (100 - 1) + 1);
      if (this.numerosElegidosComputadora.find((element) => {
        return element == numeroAleatorio;
      }) != numeroAleatorio) {
        this.numerosElegidosComputadora.push(numeroAleatorio);
      }
      else {
        i--;
      }
    }
  }

  Verificar() {
    var agregarIntento = 0;
    this.numerosElegidosUsuario.forEach(numUsuario => {
      if (this.numerosElegidosComputadora.find((numComputadora) => {
        return numComputadora == numUsuario.numero;
      }) == numUsuario.numero) {
        this.aciertos++;
      }
    });
    if (this.aciertos == this.numerosElegidosUsuario.length) {
      agregarIntento = 1;
    }
    if (this.aciertos == 0) {
      this.OpenDialog("Puntuacion: " + this.puntuacion, "Perdiste!");
      this.numerosElegidosUsuario = [];
      for (let i = 0; i < 5; i++) {
        this.numerosElegidosUsuario.push(JSON.parse('{"numero":""}'))
      }
      this.ElegirNumerosComputadora();
      this.aciertos = 0;
      this.puntuacion = 0;
    }
    else {
      this.numerosElegidosUsuario = [];
      for (let i = 0; i < (this.aciertos + agregarIntento); i++) {
        this.numerosElegidosUsuario.push(JSON.parse('{"numero":""}'))
      }
      this.ElegirNumerosComputadora();
      this.aciertos = 0;
      this.puntuacion++;
    }
  }
  OpenDialog(mensaje: string, cabezera: string) {
    let dialogRef = this.dialog.open(DialogAlert, {
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
