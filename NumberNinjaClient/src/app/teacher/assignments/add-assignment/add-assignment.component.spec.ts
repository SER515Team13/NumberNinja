import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssignmentComponent } from './add-assignment.component';
import { AssignmentService } from '../../service/assignment.service';
import { MatCardHeader,MatIcon,MatCardTitle,MatToolbar,MatCardContent} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';

describe('AddAssignmentComponent', () => {
  let component: AddAssignmentComponent;
  let fixture: ComponentFixture<AddAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[FormsModule, ReactiveFormsModule, MatDialogModule],
      providers: [ AssignmentService, MatDialogRef],
      declarations: [AddAssignmentComponent,MatCardHeader,MatIcon,MatCardTitle,MatToolbar,MatCardContent ]
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
