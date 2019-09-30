import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInComponent } from './signin.component';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../shared/user.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  const mockRouter = new MockRouter();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [UserService, HttpClient, HttpHandler, {provide: Router, useValue: mockRouter}],
      declarations: [ SignInComponent ],
      imports: [FormsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
