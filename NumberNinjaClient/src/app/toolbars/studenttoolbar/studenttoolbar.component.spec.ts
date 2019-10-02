import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentToolbarComponent } from './studenttoolbar.component';

describe('ToolbarComponent', () => {
  let component: StudentToolbarComponent;
  let fixture: ComponentFixture<StudentToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
