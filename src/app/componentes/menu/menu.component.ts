import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import {Location} from '@angular/common';
import { identifierModuleUrl } from '@angular/compiler';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  
  constructor(
    private auth:AuthService,
    private router:Router,
    private _location: Location,
  ) { }
  botones = {
    back:true,
    home:true,
    opciones:true
  };

  ngOnInit(): void {
    /*console.log(this._location.path(true));
    if((this._location.path(true)=="/login"))
    {
      this.botones = false;
    }*/

    this.router.events.subscribe((events:any)=>{
      //console.log(events.url);
      if(events.url == "/login" && events.url != undefined)
      {
        //console.log(this._location.path(true), "Prender botones");
        this.botones.back = false;
        this.botones.home = false;
        this.botones.opciones = false;
      }
      else if(events.url == "/registro"){
        //console.log(this._location.path(true),"Quitar botones");
        this.botones.back = true;
        this.botones.home = false;
        this.botones.opciones = false;
      }
      else if(events.url == "/listaJuegos")
      {
        this.botones.back = false;
        this.botones.home = false;
        this.botones.opciones = true;
      }
      else if(events.url == "/acercaDe" && events.url != undefined)
      {
        this.botones.back = true;
        this.botones.home = false;
        this.botones.opciones = true;
      }
      else if(events.url != undefined)
      {
        this.botones.back = true;
        this.botones.home = false;
        this.botones.opciones = true;
      }
    });

    /*this._location.onUrlChange(()=>{
      if((this._location.path(true)!="/login"))
      {
        console.log(this._location.path(true));
        this.botones = true;
      }
    })*/

  }

  CerrarSesion(){
    this.auth.LogOut().then(()=>{
      this.router.navigateByUrl("/login");
    })
  }

  backClicked() {
    this._location.back();
    //console.log(this._location.path(true));
  }


}
