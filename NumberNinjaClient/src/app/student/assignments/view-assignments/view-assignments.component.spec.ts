/**
 * @project NumberNinja
 * @authors Abhinaw Sarang, Saksham Jhawar
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewAssignmentsComponent } from './view-assignments.component';
import { MatTableModule, MatDialogModule} from '@angular/material';
import { AssignmentService } from 'src/app/teacher/service/assignment.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StudentToolbarComponent } from 'src/app/toolbars/studenttoolbar/studenttoolbar.component';

describe('ViewAssignmentsComponent', () => {
  let component: ViewAssignmentsComponent;
  let fixture: ComponentFixture<ViewAssignmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTableModule, 
        MatDialogModule,
        HttpClientTestingModule, 
        RouterTestingModule
      ],
      providers: [ AssignmentService ],
      declarations: [ ViewAssignmentsComponent,StudentToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});