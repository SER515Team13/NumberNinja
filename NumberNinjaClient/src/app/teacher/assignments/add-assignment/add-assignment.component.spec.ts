/**
 * @project NumberNinja
 * @authors Sukhpreet Singh Anand, Saksham Jhawar, Abhinaw Sarang
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddAssignmentComponent } from './add-assignment.component';
import { AssignmentService } from '../../service/assignment.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MatCardModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AddAssignmentComponent', () => {
  let component: AddAssignmentComponent;
  let fixture: ComponentFixture<AddAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ FormsModule, ReactiveFormsModule,
      MatCardModule, MatIconModule, MatToolbarModule,
      BrowserAnimationsModule,
      MatDialogModule,
      HttpClientTestingModule ],
      providers: [ AssignmentService,
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA}] ,
      declarations: [ AddAssignmentComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
