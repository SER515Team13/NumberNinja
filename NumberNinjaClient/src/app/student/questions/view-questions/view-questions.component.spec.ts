/**
 * @project NumberNinja
 * @author Sagar Khar, Abhinaw Sarang
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule, MatIcon, MatIconModule, MatToolbarModule, MatTableModule, MatDialogModule } from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuestionServiceService } from '../../service/question-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StudentToolbarComponent } from 'src/app/toolbars/studenttoolbar/studenttoolbar.component';
import { ViewQuestionsComponent } from './view-questions.component';

describe('ViewQuestionsComponent', () => {
  let component: ViewQuestionsComponent;
  let fixture: ComponentFixture<ViewQuestionsComponent>;

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
        RouterTestingModule
      ],
      declarations: [ ViewQuestionsComponent, StudentToolbarComponent ],
      providers: [ QuestionServiceService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
