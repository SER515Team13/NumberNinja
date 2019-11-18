/**
 * @project NumberNinja
 * @author Sukhpreet Singh Anand, Saksham Jhawar
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teachertoolbar',
  templateUrl: './teachertoolbar.component.html',
  styleUrls: ['./teachertoolbar.component.css']
})
export class TeacherToolbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  Logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    this.router.navigate(['/login']);
  }
}