import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssignmentComponent } from './add-assignment.component';
import { AssignmentService } from '../../service/assignment.service';

describe('AddAssignmentComponent', () => {
  let component: AddAssignmentComponent;
  let fixture: ComponentFixture<AddAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ AssignmentService ],
      declarations: [ AddAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
