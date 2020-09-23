import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ListaJuegosComponent } from '../lista-juegos/lista-juegos.component';
@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.scss']
})
export class AnagramaComponent implements OnInit {
  public listaPalabras = [
  "venus",
  "mariposa",
  "confidencial",
  "probar",
  "lamentable",
  "broma",
  "suprema",
  "estallar",
  "supuesta",
  "continente",
  "parrilla",
  "anchura",
  "apuntes",
  "contestar",
  "conservadora",
  "republicana",
  "violentos",
  "prohibida",
  "rastrear",
  "conflicto",
  "finalista"
];
palabraElegida:string;
palabraRespuesta:string;
palabraIngresada:string; 
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.ElegirPalabra();
  }

  ElegirPalabra()
  {
    //Eligo un indice del array de palabras
    var indiceAleatorio:number = Math.round(Math.random() * (20 - 1) + 1);
    //Extraigo la palabra segun el indice
    var palabraAleatoria:string = this.listaPalabras[indiceAleatorio];
    //Lo convierto en array para poder desordenarla
    var palabraAleatoriaArray =  palabraAleatoria.trim().split('');
    //Palabra desordenada final
    var palabraDesordenada:string = "";
    //Se realizaran 3 intercambios. Mas de este valor se vuelve muy dificil...
    for(var i = 0; i<3; i++)
    {
      //El codigo consiste en agarrar indices aleatorios de la palabra e intercambiarlos
      let indiceLetraOrigen = Math.round(Math.random() * ((palabraAleatoria.length-1) - 0) + 0);
      let indiceLetraDestino = Math.round(Math.random() * ((palabraAleatoria.length-1) - 0) + 0);
      let letraOrigen = palabraAleatoriaArray[indiceLetraOrigen];
      let letraDestino = palabraAleatoriaArray[indiceLetraDestino];
      palabraAleatoriaArray[indiceLetraOrigen] = letraDestino;
      palabraAleatoriaArray[indiceLetraDestino] = letraOrigen;
    }

    //Convierto el array en string
    palabraAleatoriaArray.forEach(letra =>{
      palabraDesordenada += letra;
    });
    this.palabraElegida = palabraDesordenada;
    this.palabraRespuesta = palabraAleatoria;
  }

  VerificarPalabra()
  {
    //Se debe comparar el input con la palabra original
    if(this.palabraRespuesta == this.palabraIngresada)
    {
      this.OpenDialog("Respuesta correcta!","Felicidades!");
      this.ElegirPalabra();
    }
    else
    {

      this.OpenDialog("Respuesta incorrecta. Intentelo de nuevo.","Mal!");
    }
  }
  OpenDialog(mensaje:string,cabezera:string)
  {
    let dialogRef = this.dialog.open(DialogAlert, {
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
