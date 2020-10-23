import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import {Location} from '@angular/common';
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
  botones;

  ngOnInit(): void {
    /*console.log(this._location.path(true));
    if((this._location.path(true)=="/login"))
    {
      this.botones = false;
    }*/

    this.router.events.subscribe((events:any)=>{
      //console.log(events);
      if(events.url == "/login")
      {
        //console.log(this._location.path(true), "Prender botones");
        this.botones = false;
      }
      else if(events.url != "/login" && events.url != undefined){
        //console.log(this._location.path(true),"Quitar botones");
        this.botones = true;
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
