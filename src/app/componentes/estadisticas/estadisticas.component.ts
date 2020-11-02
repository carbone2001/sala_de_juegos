import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstadisticasService } from 'src/app/services/estadisticas.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent implements OnInit {

  breakpoint: number;
  alturaColumnas: string;

  //Puntuaciones de los juegos
  anagrama: any;
  ppt: any;
  aa: any;
  an: any;
  tateti: any;
  memotest: any;
  juegoAlumno: any;

  constructor(
    private router: Router,
    public estadisticas: EstadisticasService

  ) {

  }

  ngOnInit(): void {
    this.RedimencionarBotones();

    this.estadisticas.ObtenerEstadisticas('anagrama').subscribe((data) => {
      this.anagrama = data;
    });
    this.estadisticas.ObtenerEstadisticas('piedraPapelTijera').subscribe((data) => {
      this.ppt = data;
    });
    this.estadisticas.ObtenerEstadisticas('agilidadAritmetica').subscribe((data) => {
      this.aa = data;
    });
    this.estadisticas.ObtenerEstadisticas('adivinaNumero').subscribe((data) => {
      this.an = data;
    });
    this.estadisticas.ObtenerEstadisticas('tateti').subscribe((data) => {
      this.tateti = data;
    });
    this.estadisticas.ObtenerEstadisticas('memotest').subscribe((data) => {
      this.memotest = data;
    });
    this.estadisticas.ObtenerEstadisticas('juegoAlumno').subscribe((data) => {
      console.log(data);
      this.juegoAlumno = data;
      this.EstablecerPorcentajes();
    });


    this.estadisticas.ObtenerEstadisticasUsuario('anagrama');
    this.estadisticas.ObtenerEstadisticasUsuario('piedraPapelTijera');
    this.estadisticas.ObtenerEstadisticasUsuario('agilidadAritmetica');
    this.estadisticas.ObtenerEstadisticasUsuario('adivinaNumero');
    this.estadisticas.ObtenerEstadisticasUsuario('tateti');
    this.estadisticas.ObtenerEstadisticasUsuario('memotest');
    this.estadisticas.ObtenerEstadisticasUsuario('juegoAlumno');


  }


  onResize(event) {
    this.RedimencionarBotones();
  }

  RedimencionarBotones() {
    if (window.innerWidth <= 1359 && window.innerWidth > 900) {
      this.alturaColumnas = "1:1";
      this.breakpoint = 2;
    }
    else if (window.innerWidth <= 900 && window.innerWidth > 670) {
      this.alturaColumnas = "1:1";
      this.breakpoint = 2;
    }
    else if (window.innerWidth <= 670 && window.innerWidth > 450) {
      this.alturaColumnas = "1:1";
      this.breakpoint = 1;
    }
    else if (window.innerWidth <= 450) {
      this.breakpoint = 1;
      this.alturaColumnas = "1:1";
    }
    else {
      this.alturaColumnas = "1:1";
      this.breakpoint = 3;
    }
  }

  EstablecerPorcentajes() {
    //ANAGRAMA
    var maximoValor = this.anagrama.reduce((anterior, actual) => {
      if (actual.puntuacion > anterior) {
        return actual.puntuacion;
      }
      return anterior;
    }, 0);
    this.anagrama = this.anagrama.map((actual) => {
      actual.porcentaje = (actual.puntuacion * 100) / maximoValor;
      return actual;
    })


    //PPT
    var maximoValor = this.ppt.reduce((anterior, actual) => {
      if (actual.puntuacion > anterior) {
        return actual.puntuacion;
      }
      return anterior;
    }, 0);
    this.ppt = this.ppt.map((actual) => {
      actual.porcentaje = (actual.puntuacion * 100) / maximoValor;
      return actual;
    })


    //AA
    var maximoValor = this.aa.reduce((anterior, actual) => {
      if (actual.puntuacion > anterior) {
        return actual.puntuacion;
      }
      return anterior;
    }, 0);
    this.aa = this.aa.map((actual) => {
      actual.porcentaje = (actual.puntuacion * 100) / maximoValor;
      return actual;
    })


    //AN
    var maximoValor = this.an.reduce((anterior, actual) => {
      if (actual.puntuacion > anterior) {
        return actual.puntuacion;
      }
      return anterior;
    }, 0);
    this.an = this.an.map((actual) => {
      actual.porcentaje = (actual.puntuacion * 100) / maximoValor;
      return actual;
    })


    //Tateti
    var maximoValor = this.tateti.reduce((anterior, actual) => {
      if (actual.puntuacion > anterior) {
        return actual.puntuacion;
      }
      return anterior;
    }, 0);
    this.tateti = this.tateti.map((actual) => {
      actual.porcentaje = (actual.puntuacion * 100) / maximoValor;
      return actual;
    })


    //memotest
    var maximoValor = this.memotest.reduce((anterior, actual) => {
      if (actual.puntuacion > anterior) {
        return actual.puntuacion;
      }
      return anterior;
    }, 0);
    this.memotest = this.memotest.map((actual) => {
      actual.porcentaje = (actual.puntuacion * 100) / maximoValor;
      return actual;
    })


    //JUEGOALUMNO
    var maximoValor = this.juegoAlumno.reduce((anterior, actual) => {
      if (actual.puntuacion > anterior) {
        return actual.puntuacion;
      }
      return anterior;
    }, 0);
    this.juegoAlumno = this.juegoAlumno.map((actual) => {
      actual.porcentaje = (actual.puntuacion * 100) / maximoValor;
      return actual;
    })




  }

}
