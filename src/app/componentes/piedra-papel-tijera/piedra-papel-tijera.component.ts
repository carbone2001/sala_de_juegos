
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-piedra-papel-tijera',
  templateUrl: './piedra-papel-tijera.component.html',
  styleUrls: ['./piedra-papel-tijera.component.scss']
})
export class PiedraPapelTijeraComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  //Animaciones
  imgSize = 500 // (%)
  opacity = 0; // [0-1]


  estilosAnimaciones = "background-size: " + this.imgSize + "%;opacity: " + this.opacity + ";background-image: url('assets/fondoAnagrama.png');";

  ngOnInit(): void {
    this.AnimacionDeInicio();
  }

  AnimacionDeInicio()
  {
    var ciclos = 100;
    var intervalo = setInterval(()=>{
      this.imgSize -= 1;
      this.opacity += 0.01;
      ciclos--;
      console.log(ciclos);
      this.estilosAnimaciones = "background-size: "+this.imgSize+"%;opacity: "+this.opacity+";background-image: url('assets/fondoPiedraPapelTijera.png');";
      if(ciclos <= 0)
      {
        clearInterval(intervalo);
      }
    },10);
  }

  OpcionElegida(opcionUsuario: string) {
    var opcionesPosible = ['piedra', 'papel', 'tijera'];
    var indiceAleatorio: number = Math.round(Math.random() * (2 - 0) + 0);
    if (opcionUsuario == opcionesPosible[indiceAleatorio]) {
      this.OpenDialog("Partida ganada", "Felicidades!");
    }
    else {
      this.OpenDialog("Yo saque " + opcionesPosible[indiceAleatorio], "Perdiste!");
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
