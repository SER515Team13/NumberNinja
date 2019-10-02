import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-studenttoolbar',
  templateUrl: './studenttoolbar.component.html',
  styleUrls: ['./studenttoolbar.component.css']
})
export class StudentToolbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  Logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    this.router.navigate(['/login']);
  }
}
