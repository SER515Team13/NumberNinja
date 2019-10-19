import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentsComponent } from './assignments.component';
import { AssignmentService } from '../../service/assignment.service';
import { MatTableModule} from '@angular/material';

describe('AssignmentsComponent', () => {
  let component: AssignmentsComponent;
  let fixture: ComponentFixture<AssignmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatTableModule],
      providers: [ AssignmentService ],
      declarations: [ AssignmentsComponent ]
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
