import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { MatTableDataSource } from '@angular/material';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

const userRoles : String[] = [ 'Student',
'Teacher'
];

const ELEMENT_DATA : User[] = [
  {firstName: 'Aloo',lastName: 'Pakode',email: 'asd@gingle.com', role: 'Student'},
  {firstName: 'Paratha',lastName: 'Shop',email: 'dada@eat.com', role: ''},
  {firstName: 'Abhinaw',lastName: 'Sarang',email: 'scrummaster@gmail.com',  role: 'Student'},
  {firstName: 'Sukhy',lastName: 'Anand',email: 'Badebhaiya@gmail.com', role: 'Student'},
  {firstName: 'Smit',lastName: 'Shah',email: 'librarian@library.com', role: 'Student'},
  {firstName: 'Saksham',lastName: 'Jhawar',email: 'chotebhaiya@gmail.com', role: 'Teacher'},
  {firstName: 'Sagar',lastName: 'Khar',email: 'jagte@raho.com', role: 'Student'},
  {firstName: 'Abcd',lastName: 'Dsef',email: 'adv@sas.org', role: ''},
  {firstName: 'asdf',lastName: 'sdf',email: 'wee3@eee.eed', role: 'Teacher'},
  {firstName: 'ded',lastName: 'edd',email: 'ded.edd@wer.com', role: 'Student'},
];


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  roles : String[] = userRoles;

  dataSource =  new MatTableDataSource(ELEMENT_DATA);
  displayedColumns: String[] = ['firstName', 'lastName', 'email', 'role', 'action'];

  roleControl = new FormControl('', [ Validators.required]);


 public deleteUser( selectedUser : User) {
  
    const index: number = this.dataSource.data.indexOf(selectedUser);
    const data = this.dataSource.data;
    if (index !== -1) {
      console.log(index + " "+ selectedUser.firstName + " is deleted");
      data.splice(index, 1);
      this.dataSource.data = data;
    }
 }

  

}
