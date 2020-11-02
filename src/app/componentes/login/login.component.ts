
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from  '../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  correo = "asd@asd.com";
  clave = "asdasd";
  constructor(
    private auth:AuthService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.auth.UsuarioLogeado().then(user=>{
      
      if(user != null &&  user.uid ==  localStorage.getItem("usuarioLogeado"))
      {
        this.router.navigateByUrl('/listaJuegos');
      }
      else
      {
        console.log('No se pudo encontrar al usuario: ',user);
      }
    })
  }

  Verificar()
  {
    try
    {
      this.auth.Login(this.correo,this.clave).then((user)=>{
        if(user)
        {
          localStorage.setItem("usuarioLogeado",user.user.uid);
          this.router.navigateByUrl('/listaJuegos');
        }
        else
        {
          alert("Logeo erroneo");
        }
      })
    }
    catch(e)
    {
      alert('Inicio de sesion erroneo');
    }
  }



}
