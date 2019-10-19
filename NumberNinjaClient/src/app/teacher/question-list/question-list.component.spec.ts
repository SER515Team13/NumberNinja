import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionListComponent } from './question-list.component';
import { QuestionService } from '../service/question-service';
import { MatCardTitle,MatIcon,MatToolbar,MatCardHeader } from '@angular/material';

describe('QuestionListComponent', () => {
  let component: QuestionListComponent;
  let fixture: ComponentFixture<QuestionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ QuestionService ],
      declarations: [ QuestionListComponent,MatCardTitle,MatIcon,MatToolbar,MatCardHeader ]
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
