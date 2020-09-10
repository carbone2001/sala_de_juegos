import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  breakpoint:number;
  constructor() { }

  ngOnInit(): void {
    if(window.innerWidth <= 1000 && window.innerWidth > 515)
    {
      this.breakpoint = 4;
    }
    else if(window.innerWidth <= 515)
    {
      this.breakpoint = 1;
    }
    else
    {
      this.breakpoint = 6
    }
  }

  onResize(event) {
    if(window.innerWidth <= 1000 && window.innerWidth > 515)
    {
      this.breakpoint = 4;
    }
    else if(window.innerWidth <= 515)
    {
      this.breakpoint = 1;
    }
    else
    {
      this.breakpoint = 6
    }
  }

}
