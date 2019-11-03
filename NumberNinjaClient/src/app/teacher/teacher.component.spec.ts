import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TeacherComponent } from './teacher.component';
import { TeacherToolbarComponent } from './../toolbars/teachertoolbar/teachertoolbar.component';
import {QuestionListComponent} from './question-list/question-list.component';
import { MatDialog, MatCardModule, MatIcon, MatIconModule, MatToolbarModule, MatTableModule } from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('TeacherComponent', () => {
  let component: TeacherComponent;
  let fixture: ComponentFixture<TeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatCardModule,
        MatIconModule,
        MatToolbarModule,
        MatTableModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
      ],
      declarations: [ 
        TeacherComponent,
        TeacherToolbarComponent,
        QuestionListComponent

      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

