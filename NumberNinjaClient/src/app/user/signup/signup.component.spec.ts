import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './signup.component';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../shared/user.service';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [UserService, ToastrService],
      declarations: [ SignUpComponent ],
      imports: [ FormsModule, HttpClientModule ],
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
