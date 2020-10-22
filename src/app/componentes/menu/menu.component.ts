import { Component, OnInit } from '@angular/core';
import { SplitInterpolation } from '@angular/compiler';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  botones=true;
  constructor(
    private auth:AuthService,
    private router:Router,
  ) { }

  ngOnInit(): void {

  }

  CerrarSesion(){
    this.auth.LogOut().then(()=>{
      this.router.navigateByUrl("/login");
    })
  }

}
