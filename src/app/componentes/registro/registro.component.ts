import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { EstadisticasService } from 'src/app/services/estadisticas.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  correo = "";
  clave = "";
  constructor(
    private auth:AuthService,
    private router:Router,
    private estadisticas:EstadisticasService
  ) { }

  ngOnInit(): void {

  }

  Registrarse()
  {
    try {
      this.auth.CrearUsuario(this.correo,this.clave).then((data)=>{
        if(data != undefined)
        {
          var nuevoUsuario = new Usuario();
          nuevoUsuario.correo = this.correo;
          nuevoUsuario.clave = this.clave;
          this.estadisticas.CrearEstadisticasUsuario();
          this.router.navigateByUrl('/listaJuegos');
        }
        else{

        }
      });
    } catch (error) {
      console.log(error);
    }
  }

}
