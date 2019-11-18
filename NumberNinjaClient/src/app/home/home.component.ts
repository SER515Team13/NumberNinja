/**
 * @project NumberNinja
 * @authors Sukhpreet Singh Anand, Abhinaw Sarang
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  adminRole: String = "admin";
  teacherRole: String = "teacher";
  studentRole: String = "student";

  constructor(private router: Router) { }

  ngOnInit() { 
    switch(localStorage.getItem('userRole')) {
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
        this.router.navigate(['/login'])
    }
  }

  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }
}
