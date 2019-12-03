/**
 * @project NumberNinja
 * @author Abhinaw Sarang
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpComponent } from './signup.component';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../shared/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [UserService, ToastrService],
      declarations: [ SignUpComponent ],
      imports: [ FormsModule, HttpClientTestingModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
}); 
