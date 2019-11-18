/**
 * @project NumberNinja
 * @author Sukhpreet Singh Anand, Saksham Jhawar
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admintoolbar',
  templateUrl: './admintoolbar.component.html',
  styleUrls: ['./admintoolbar.component.css']
})
export class AdminToolbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  Logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    this.router.navigate(['/login']);
  }
}