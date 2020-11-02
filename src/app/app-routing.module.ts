import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcercaDeComponent } from './componentes/acerca-de/acerca-de.component';
import { ListaJuegosComponent } from './componentes/lista-juegos/lista-juegos.component';
import { AnagramaComponent } from './componentes/anagrama/anagrama.component';
import { PiedraPapelTijeraComponent } from './componentes/piedra-papel-tijera/piedra-papel-tijera.component';
import { AgilidadAritmeticaComponent } from './componentes/agilidad-aritmetica/agilidad-aritmetica.component';
import { AdivinaNumeroComponent } from './componentes/adivina-numero/adivina-numero.component';
import { TaTeTiComponent } from './componentes/ta-te-ti/ta-te-ti.component';
import { MemotestComponent } from './componentes/memotest/memotest.component';
import { JuegoAlumnoComponent } from './componentes/juego-alumno/juego-alumno.component';
import { LoginComponent } from './componentes/login/login.component';
import { AutenticacionGuard } from './guards/autenticacion.guard';
import { RegistroComponent } from './componentes/registro/registro.component';
import { EstadisticasComponent } from './componentes/estadisticas/estadisticas.component';
const routes: Routes = [
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"registro",
    component:RegistroComponent
  },
  {
    path:"listaJuegos",
    component:ListaJuegosComponent,
    canActivate:[AutenticacionGuard]
  },
  {
    path:"estadisticas",
    component:EstadisticasComponent,
    canActivate:[AutenticacionGuard]
  },
  {
    path:"anagrama",
    component:AnagramaComponent,
    canActivate:[AutenticacionGuard]
  },
  {
    path:"piedraPapelTijera",
    component:PiedraPapelTijeraComponent,
    canActivate:[AutenticacionGuard]
  },
  {
    path:"agilidadAritmetica",
    component:AgilidadAritmeticaComponent,
    canActivate:[AutenticacionGuard]
  },
  {
    path:"adivinaNumero",
    component:AdivinaNumeroComponent,
    canActivate:[AutenticacionGuard]
  },
  {
    path:"tateti",
    component:TaTeTiComponent,
    canActivate:[AutenticacionGuard]
  },
  {
    path:"memotest",
    component:MemotestComponent,
    canActivate:[AutenticacionGuard]
  },
  {
    path:"juegoAlumno",
    component:JuegoAlumnoComponent,
    canActivate:[AutenticacionGuard]
  },
  {
    path:"acercaDe",
    component: AcercaDeComponent,
    canActivate:[AutenticacionGuard]
  },
  {
    path: '',
    redirectTo: 'listaJuegos',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
