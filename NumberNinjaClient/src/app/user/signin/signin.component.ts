/**
 * @project NumberNinja
 * @author Sukhpreet Singh Anand, Abhinaw Sarang, Saksham Jhawar
 */

import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { async, inject } from '@angular/core/testing';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SignInComponent implements OnInit {
  
  isLoginError: boolean = false;
  message: String = "Internal Error";

  adminRole: String = "admin";
  teacherRole: String = "teacher";
  studentRole: String = "student";

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {}

  OnSubmit(email, password) {
      this.userService.userAuthentication(email, password).subscribe((data: any) => {
      localStorage.setItem('userToken', data.token);
      localStorage.setItem('userRole', data.role);
      localStorage.setItem('userGrade',data.userGrade)
      localStorage.setItem('userEmail',data.userEmail)

      switch(data.role) {
        case this.adminRole:
          this.router.navigate(['/admin']);
          break;
        
        case this.teacherRole:
          this.router.navigate(['/teacher']);
          break;

        case this.studentRole:
          this.router.navigate(['/student']);
          
          break;

        default:
          this.isLoginError = true;
          this.message = "Internal error.";
      }
      
    },
    (err: HttpErrorResponse) => {
      this.isLoginError = true;
      this.message = err.error.message;
    });
  }
}
