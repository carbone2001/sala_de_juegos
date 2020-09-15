import { Component, OnInit } from '@angular/core';
import { SplitInterpolation } from '@angular/compiler';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
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
