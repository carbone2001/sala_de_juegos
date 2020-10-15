import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-adivina-numero',
  templateUrl: './adivina-numero.component.html',
  styleUrls: ['./adivina-numero.component.scss']
})
export class AdivinaNumeroComponent implements OnInit {

  constructor(
    public dialog:MatDialog
  ) { }
  numeroIngresado;
  ngOnInit(): void {
  }

  VerificarNumero(){
    var numeroAleatorio:number = Math.round(Math.random() * (10 - 0) + 0);
    if(numeroAleatorio == this.numeroIngresado)
    {
      this.OpenDialog("Numero correcto!","Felicidades!");
    }
    else
    {
      this.OpenDialog("La respuesta era: "+numeroAleatorio,"Perdiste!");
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