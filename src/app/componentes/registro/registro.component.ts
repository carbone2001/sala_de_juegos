import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  profileForm;
  constructor(
    private auth:AuthService,
    private router:Router,
    private estadisticas:EstadisticasService,
    public fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      correo:["",Validators.compose([
        Validators.email,
        Validators.required
      ])],
      clave:["", Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6)
      ])]
    })

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
