import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentsComponent } from './assignments.component';
import { AssignmentService } from '../../service/assignment.service';
import { MatTableModule, MatDialogModule, MatIconModule} from '@angular/material';
import { HttpClient } from 'selenium-webdriver/http';
import { HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TeacherToolbarComponent } from './../../../toolbars/teachertoolbar/teachertoolbar.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AssignmentsComponent', () => {
  let component: AssignmentsComponent;
  let fixture: ComponentFixture<AssignmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTableModule, 
        MatIconModule,
        MatDialogModule,
        HttpClientTestingModule, 
        RouterTestingModule
      ],
      providers: [ AssignmentService ],
      declarations: [ AssignmentsComponent, TeacherToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
