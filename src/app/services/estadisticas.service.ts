import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Usuario } from '../clases/usuario';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {

  constructor(
    private firestore:AngularFirestore,
    private auth:AuthService
  ) 
  {
    this.usuario = new Usuario();
  }
  usuario:Usuario;


  ObtenerEstadisticas(tipoJuego:string)
  {
    return this.firestore.collection('estadisticas/'+tipoJuego+'/registros', 
      ref => ref.orderBy('puntuacion','desc').limit(3)
    )
    .valueChanges();
  }

  ObtenerEstadisticasUsuario(tipoJuego:String)
  {
    this.auth.UsuarioLogeado().then((user)=>{
      if(user != undefined)
      {
        var query = this.firestore.collection('estadisticas/'+tipoJuego+'/registros').doc(user.email)
        .valueChanges()
        .subscribe((data)=>{
          switch(tipoJuego)
          {
            case 'anagrama':
              this.usuario.anagrama = data;
            break;
            case 'piedraPapelTijera':
              this.usuario.ppt = data;
            break;
            case 'agilidadAritmetica':
              this.usuario.aa = data;
            break;
            case 'adivinaNumero':
              this.usuario.an = data;
            break;
            case 'memotest':
              this.usuario.memotest = data;
            break;
            case 'tateti':
              this.usuario.tateti = data;
            break;
            case 'juegoAlumno':
              this.usuario.ja = data;
            break;
          }
          console.log('Obtencion de estadisticas exitosa!');
          query.unsubscribe();
        });
      }
      else
      {
        console.log('Error al obtener estadisticas');
      }
    })
  }

  CargarEstadisticasUsuario(tipoJuego:string,puntuacion:any)
  {
    try {
      this.auth.UsuarioLogeado().then((user)=>{
        console.log(user);
        if(user != undefined)
        {
          this.firestore.collection('estadisticas/'+tipoJuego+'/registros').doc(user.email).set({
            puntuacion:puntuacion,
            usuario:user.email,
            fecha: Date.now()
          })
          console.log('Los datos estadisticas han sido cargados exitosamente!');
        }
        else
        {
          console.log('Error desconocido al cargar estadisticas');
        }
      })
    } catch (error) {
      console.log('Error al cargar estadisticas',error)
    }
  }

  CrearEstadisticasUsuario()
  {
    try {
      this.auth.UsuarioLogeado().then((user)=>{
        console.log(user);
        if(user != undefined)
        {
          this.firestore.collection('estadisticas/anagrama/registros').doc(user.email).set({
            puntuacion:0,
            usuario:user.email,
            fecha: ""
          })
          this.firestore.collection('estadisticas/agilidadAritmetica/registros').doc(user.email).set({
            puntuacion:0,
            usuario:user.email,
            fecha: ""
          })
          this.firestore.collection('estadisticas/adivinaNumero/registros').doc(user.email).set({
            puntuacion:0,
            usuario:user.email,
            fecha: ""
          })
          this.firestore.collection('estadisticas/memotest/registros').doc(user.email).set({
            puntuacion:0,
            usuario:user.email,
            fecha: ""
          })
          this.firestore.collection('estadisticas/piedraPapelTijera/registros').doc(user.email).set({
            puntuacion:0,
            usuario:user.email,
            fecha: ""
          })
          this.firestore.collection('estadisticas/tateti/registros').doc(user.email).set({
            puntuacion:0,
            usuario:user.email,
            fecha: ""
          })
          this.firestore.collection('estadisticas/juegoAlumno/registros').doc(user.email).set({
            puntuacion:0,
            usuario:user.email,
            fecha: ""
          })
          console.log('La creacion de datos estadisticas han sido cargados exitosamente!');
        }
        else
        {
          console.log('Error desconocido al cargar estadisticas');
        }
      })
    } catch (error) {
      console.log('Error al cargar estadisticas',error)
    }
  }

  

}
