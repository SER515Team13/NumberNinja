import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolveQuestionComponent } from './solve-question.component';

describe('SolveQuestionComponent', () => {
  let component: SolveQuestionComponent;
  let fixture: ComponentFixture<SolveQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolveQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolveQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
