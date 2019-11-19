/**
 * @project NumberNinja
 * @author Sukhpreet Singh Anand, Saksham Jhawar
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-studenttoolbar',
  templateUrl: './studenttoolbar.component.html',
  styleUrls: ['./studenttoolbar.component.css']
})
export class StudentToolbarComponent implements OnInit {

  constructor(private router: Router) { }
  public show: boolean

  ngOnInit() {
    let grade = localStorage.getItem('userGrade')
    if (grade == '2'){
      this.show= true
    }
    else{
      this.show= false
    }
  }

  Logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    this.router.navigate(['/login']);
  }
}