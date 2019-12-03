/**
 * @project NumberNinja
 * @author Sagar Khar
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachergradesComponent } from './teachergrades.component';
import { TeacherToolbarComponent } from 'src/app/toolbars/teachertoolbar/teachertoolbar.component';
import { MatSelectModule, MatToolbarModule, MatTableModule, MatDialogModule, MatIconModule, MatOptionModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AssignmentService } from '../service/assignment.service';

describe('TeachergradesComponent', () => {
  let component: TeachergradesComponent;
  let fixture: ComponentFixture<TeachergradesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachergradesComponent, TeacherToolbarComponent ],
      providers: [AssignmentService],
      imports: [
        MatIconModule,
        MatToolbarModule,
        MatTableModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        MatDialogModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatOptionModule,
        MatSelectModule
      ],    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachergradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
