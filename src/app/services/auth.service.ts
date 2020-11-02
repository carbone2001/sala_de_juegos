import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  constructor(
    private auth:AngularFireAuth
  ) { }

  async Login(correo,clave)
  {
    return await this.auth.signInWithEmailAndPassword(correo,clave);
  }

  async CrearUsuario(correo,clave)
  {
    return await this.auth.createUserWithEmailAndPassword(correo,clave);
  }

  async UsuarioLogeado()
  {
    return await this.auth.currentUser;
  }

  async LogOut()
  {
    return await this.auth.signOut();
  }
}
