import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-lista-juegos',
  templateUrl: './lista-juegos.component.html',
  styleUrls: ['./lista-juegos.component.scss']
})
export class ListaJuegosComponent implements OnInit {

  breakpoint:number;
  alturaColumnas:string;

  //animaciones
  opacidadDivPrincipal = "opacity: 1;";
  opacity: number = 0;
  blur: number = 20;
  constructor(
    private router:Router,

  ) { }

  ngOnInit(): void {
    this.RedimencionarBotones();
    this.opacidadDivPrincipal = "opacity: 1;";
    this.AnimacionDeInicio();
  }

  AnimacionDeInicio()
  {
    var ciclos = 100;
    var intervalo = setInterval(()=>{
      this.opacity += 0.01;
      this.blur -= 0.2;
      ciclos--;
      if(ciclos <= 0)
      {
        clearInterval(intervalo);
      }
    },5);
  }

  onResize(event) {
    this.RedimencionarBotones();
  }

  RedimencionarBotones()
  {
    if(window.innerWidth <= 1359 && window.innerWidth > 900)
    {
      this.alturaColumnas="1:1";
      this.breakpoint = 4;
    }
    else if(window.innerWidth <= 900 && window.innerWidth > 670)
    {
      this.alturaColumnas="1:1";
      this.breakpoint = 3;
    }
    else if(window.innerWidth <= 670 && window.innerWidth > 450)
    {
      this.alturaColumnas="1:1";
      this.breakpoint = 2;
    }
    else if(window.innerWidth <= 450)
    {
      this.breakpoint = 1;
      this.alturaColumnas="1:0.4";
    }
    else
    {
      this.alturaColumnas="1:1";
      this.breakpoint = 6;
    }
  }

  GenerarTransicion(url:string)
  {
    var opacidadNumero = 1;
    var instanciaIntervalo =  setInterval(()=>{
      this.opacity = opacidadNumero;
      opacidadNumero -= 0.05;
      if(opacidadNumero <= 0)
      {
        this.router.navigateByUrl(url);
        clearInterval(instanciaIntervalo);
      }
    },5);
  }

}
