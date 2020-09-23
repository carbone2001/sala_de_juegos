import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-piedra-papel-tijera',
  templateUrl: './piedra-papel-tijera.component.html',
  styleUrls: ['./piedra-papel-tijera.component.scss']
})
export class PiedraPapelTijeraComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  OpcionElegida(opcionUsuario:string)
  {
    var opcionesPosible = ['piedra','papel','tijera'];
    var indiceAleatorio:number = Math.round(Math.random() * (2 - 0) + 0);
    if(opcionUsuario == opcionesPosible[indiceAleatorio])
    {
      alert("Felicidades gano!");
    }
    else
    {
      alert("Perdiste... yo saqué "+opcionesPosible[indiceAleatorio]);
    }
  }

}
