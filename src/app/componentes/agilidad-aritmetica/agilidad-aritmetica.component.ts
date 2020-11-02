import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EstadisticasService } from 'src/app/services/estadisticas.service';

@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.scss']
})
export class AgilidadAritmeticaComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public estadisticas: EstadisticasService
  ) { }
  operadores = [
    '+',
    '-',
    '/',
    '*'
  ];
  tituloBotonInicio = "Iniciar";
  respuesta;
  operacionStr = "";
  numeroIngresado;
  segundos = 0;
  instanciaReloj;

  //Animaciones
  imgSize = 400 // (%)
  opacity = 0; // [0-1]
  estilosAnimaciones = "background-size: " + this.imgSize + "%;opacity: " + this.opacity + ";background-image: url('assets/imagenAgilidadAritmetica.jpg');";

  ngOnInit(): void {
    this.AnimacionDeInicio();
    this.estadisticas.ObtenerEstadisticasUsuario('agilidadAritmetica');
  }

  AnimacionDeInicio()
  {
    var ciclos = 100;
    var intervalo = setInterval(()=>{
      this.imgSize -= 1;
      this.opacity += 0.01;
      ciclos--;
      this.estilosAnimaciones = "background-size: "+this.imgSize+"%;opacity: "+this.opacity+";background-image: url('assets/imagenAgilidadAritmetica.jpg');";
      if(ciclos <= 0)
      {
        clearInterval(intervalo);
      }
    },5);
  }

  CrearOperacion() {
    var operando1: number = Math.round(Math.random() * (100 - 0) + 0);
    var operando2: number = Math.round(Math.random() * (100 - 0) + 0);
    var operador = this.operadores[Math.round(Math.random() * (3 - 0) + 0)];
    this.Calcular(operando1, operando2, operador);
    this.operacionStr = operando1.toString() + " " + operador + " " + operando2.toString();
    this.IniciarReloj();
    this.tituloBotonInicio = "Buscar otra operación";
  }

  Calcular(op1, op2, operador) {
    switch (operador) {
      case '+':
        this.respuesta = parseFloat((op1 + op2).toFixed(2));
        break;
      case '-':
        this.respuesta = parseFloat((op1 - op2).toFixed(2));
        break;
      case '*':
        this.respuesta = parseFloat((op1 * op2).toFixed(2));
        break;
      case '/':
        this.respuesta = parseFloat((op1 / op2).toFixed(2));
        break;
    }
  }

  VerificarNumero() {
    if (this.numeroIngresado == this.respuesta) {
      this.OpenDialog("Respuesta correcta.", "Felicidades!");
      this.estadisticas.usuario.aa.puntuacion += 1;
      this.estadisticas.CargarEstadisticasUsuario('agilidadAritmetica',this.estadisticas.usuario.aa.puntuacion);
    }
    else {
      this.OpenDialog("La respuesta es: " + this.respuesta, "Incorrecto!");
    }
  }

  IniciarReloj() {
    clearInterval(this.instanciaReloj);
    this.segundos = 0;
    this.instanciaReloj = setInterval(() => {
      this.segundos++;
    }, 1000);
  }
  OpenDialog(mensaje: string, cabezera: string) {
    clearInterval(this.instanciaReloj);
    this.dialog.open(DialogAlert, {
      data: { mensaje: mensaje, cabezera: cabezera }
    }).afterClosed().subscribe(() => {
      this.CrearOperacion();
    })
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