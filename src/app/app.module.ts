import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import { AcercaDeComponent } from './componentes/acerca-de/acerca-de.component';
import { ListaJuegosComponent } from './componentes/lista-juegos/lista-juegos.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AnagramaComponent, DialogAlert } from './componentes/anagrama/anagrama.component';
import { PiedraPapelTijeraComponent } from './componentes/piedra-papel-tijera/piedra-papel-tijera.component';
import { AgilidadAritmeticaComponent } from './componentes/agilidad-aritmetica/agilidad-aritmetica.component';
import { AdivinaNumeroComponent } from './componentes/adivina-numero/adivina-numero.component';
import { TaTeTiComponent } from './componentes/ta-te-ti/ta-te-ti.component';
import { MemotestComponent } from './componentes/memotest/memotest.component';
import { JuegoAlumnoComponent } from './componentes/juego-alumno/juego-alumno.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatTextareaAutosize } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './componentes/login/login.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { RegistroComponent } from './componentes/registro/registro.component';
import { EstadisticasComponent } from './componentes/estadisticas/estadisticas.component';
//import { HttpClientModule } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar'

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AcercaDeComponent,
    ListaJuegosComponent,
    AnagramaComponent,
    PiedraPapelTijeraComponent,
    AgilidadAritmeticaComponent,
    AdivinaNumeroComponent,
    TaTeTiComponent,
    MemotestComponent,
    JuegoAlumnoComponent,
    DialogAlert,
    LoginComponent,
    RegistroComponent,
    EstadisticasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatGridListModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatDialogModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatProgressBarModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: LocationStrategy, useClass:HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
