import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './componentes/menu/menu.component';
import { AcercaDeComponent } from './componentes/acerca-de/acerca-de.component';
const routes: Routes = [
  {
    path:"menu",
    component: MenuComponent
  },
  {
    path:"acercaDe",
    component: AcercaDeComponent
  },
  {
    path: '',
    redirectTo: 'menu',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
