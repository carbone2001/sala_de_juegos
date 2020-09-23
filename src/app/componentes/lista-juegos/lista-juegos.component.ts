import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-juegos',
  templateUrl: './lista-juegos.component.html',
  styleUrls: ['./lista-juegos.component.scss']
})
export class ListaJuegosComponent implements OnInit {

  breakpoint:number;
  alturaColumnas:string;
  constructor() { }

  ngOnInit(): void {
    this.RedimencionarBotones();
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

}
