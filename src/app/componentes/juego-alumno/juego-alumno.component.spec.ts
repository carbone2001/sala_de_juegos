import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoAlumnoComponent } from './juego-alumno.component';

describe('JuegoAlumnoComponent', () => {
  let component: JuegoAlumnoComponent;
  let fixture: ComponentFixture<JuegoAlumnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JuegoAlumnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JuegoAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
