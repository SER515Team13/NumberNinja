/**
 * @project NumberNinja
 * @authors Abhinaw Sarang, Sagar Khar
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionListComponent } from './question-list.component';
import { MatDialog, MatCardModule, MatIcon, MatIconModule, MatToolbarModule, MatTableModule, MatDialogModule } from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuestionService } from '../service/question-service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TeacherToolbarComponent } from './../../toolbars/teachertoolbar/teachertoolbar.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('QuestionListComponent', () => {
  let component: QuestionListComponent;
  let fixture: ComponentFixture<QuestionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatIconModule,
        MatToolbarModule,
        MatTableModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        MatDialogModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      declarations: [ QuestionListComponent, TeacherToolbarComponent ],
      providers: [ QuestionService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
