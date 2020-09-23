import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './componentes/menu/menu.component';
import { AcercaDeComponent } from './componentes/acerca-de/acerca-de.component';
import { ListaJuegosComponent } from './componentes/lista-juegos/lista-juegos.component';
import { AnagramaComponent } from './componentes/anagrama/anagrama.component';
import { PiedraPapelTijeraComponent } from './componentes/piedra-papel-tijera/piedra-papel-tijera.component';
import { AgilidadAritmeticaComponent } from './componentes/agilidad-aritmetica/agilidad-aritmetica.component';
import { AdivinaNumeroComponent } from './componentes/adivina-numero/adivina-numero.component';
import { TaTeTiComponent } from './componentes/ta-te-ti/ta-te-ti.component';
import { MemotestComponent } from './componentes/memotest/memotest.component';
import { JuegoAlumnoComponent } from './componentes/juego-alumno/juego-alumno.component';
const routes: Routes = [
  {
    path:"listaJuegos",
    component:ListaJuegosComponent
  },
  {
    path:"anagrama",
    component:AnagramaComponent
  },
  {
    path:"piedraPapelTijera",
    component:PiedraPapelTijeraComponent
  },
  {
    path:"agilidadAritmetica",
    component:AgilidadAritmeticaComponent
  },
  {
    path:"adivinaNumero",
    component:AdivinaNumeroComponent
  },
  {
    path:"tateti",
    component:TaTeTiComponent
  },
  {
    path:"memotest",
    component:MemotestComponent
  },
  {
    path:"juegoAlumno",
    component:JuegoAlumnoComponent
  },
  {
    path:"acercaDe",
    component: AcercaDeComponent
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
