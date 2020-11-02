import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EstadisticasService } from 'src/app/services/estadisticas.service';

@Component({
  selector: 'app-adivina-numero',
  templateUrl: './adivina-numero.component.html',
  styleUrls: ['./adivina-numero.component.scss']
})
export class AdivinaNumeroComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public estadisticas: EstadisticasService
  ) { }
  numeroIngresado;
  //Animaciones
  imgSize = 280 // (%)
  opacity = 0; // [0-1]
  estilosAnimaciones = "background-size: " + this.imgSize + "%;opacity: " + this.opacity + ";background-image: url('assets/imagenAdivinaNumer.jpg');";

  ngOnInit(): void {
    this.AnimacionDeInicio();
    this.estadisticas.ObtenerEstadisticasUsuario('adivinaNumero');
  }

  AnimacionDeInicio()
  {
    var ciclos = 100;
    var intervalo = setInterval(()=>{
      this.imgSize -= 1;
      this.opacity += 0.01;
      ciclos--;
      this.estilosAnimaciones = "background-size: "+this.imgSize+"%;opacity: "+this.opacity+";background-image: url('assets/imagenAdivinaNumer.jpg');";
      if(ciclos <= 0)
      {
        clearInterval(intervalo);
      }
    },5);
  }



  VerificarNumero() {
    var numeroAleatorio: number = Math.round(Math.random() * (10 - 0) + 0);
    if (numeroAleatorio == this.numeroIngresado) {
      this.OpenDialog("Numero correcto!", "Felicidades!");
      this.estadisticas.usuario.an.puntuacion += 1;
      this.estadisticas.CargarEstadisticasUsuario('adivinaNumero',this.estadisticas.usuario.an.puntuacion);
    }
    else {
      this.OpenDialog("La respuesta era: " + numeroAleatorio, "Perdiste!");
    }
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