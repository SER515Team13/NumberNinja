import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, ReactiveFormsModule} from '@angular/forms';

export interface PeriodicElement {
  name: string;
  position: number;
  role: string;
  action: string;
}

export interface Role {
  name: string;
  value: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', role: 'Student', action: 'A'},
  {position: 2, name: 'Helium', role: '', action: 'A'},
  {position: 3, name: 'Lithium', role: 'Student', action: 'A'},
  {position: 4, name: 'Beryllium', role: 'Student', action: 'A'},
  {position: 5, name: 'Boron', role: 'Student', action: 'A'},
  {position: 6, name: 'Carbon', role: 'Teacher', action: 'A'},
  {position: 7, name: 'Nitrogen', role: 'Student', action: 'A'},
  {position: 8, name: 'Oxygen', role: '', action: 'A'},
  {position: 9, name: 'Fluorine', role: 'Teacher', action: 'D'},
  {position: 10, name: 'Neon', role: 'Student', action: 'A'},
];


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'role', 'action'];
  dataSource = ELEMENT_DATA;
  roles  = ['Student' , 'Teacher'];

  roleControl = new FormControl('', [ Validators.required]);

  constructor() { 
    this.dataSource = ELEMENT_DATA;

  }

  ngOnInit() {

  }

}
