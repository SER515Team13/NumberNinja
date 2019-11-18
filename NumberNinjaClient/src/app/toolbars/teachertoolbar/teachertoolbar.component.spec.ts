/**
 * @project NumberNinja
 * @author Sukhpreet Singh Anand, Saksham Jhawar
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TeacherToolbarComponent } from './teachertoolbar.component';

describe('TeachertoolbarComponent', () => {
  let component: TeacherToolbarComponent;
  let fixture: ComponentFixture<TeacherToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ TeacherToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
