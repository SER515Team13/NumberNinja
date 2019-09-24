import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { HttpService } from "../shared/http.services";


export interface User {
  name: string;
  position: number;
  role: string;
  action: string;
}

export interface Role {
  name: string;
  value: string;
}


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'action'];
  
  roles  = ['Student' , 'Teacher'];

  ELEMENT_DATA : User[] = [
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


  public dataSource =  new MatTableDataSource(this.ELEMENT_DATA);

  constructor(public http: HttpService) {}

  roleControl = new FormControl('', [ Validators.required]);
  changeDetectorRefs: any;

 deleteUser( selectedUser : User){
  
  const index: number = this.dataSource.data.indexOf(selectedUser);
  
  if (index !== -1) {
    console.log(index + " "+ selectedUser.name + " is deleted");
    this.dataSource.data.splice(index, 1);
    console.log(this.dataSource.data.length);
    this.triggerEmail(selectedUser, false);
  }
}

triggerEmail (currentUser : User, requestAccepted : boolean) {
  let user = {
    name: currentUser.name,
    email: "asarang@asu.edu",
    requestAccepted: requestAccepted
  }
  this.http.sendEmail("http://localhost:3000/sendmail", user).subscribe(
    data => {
      let res:any = data; 
      console.log("Mail has been sent to the user."
     );
    }
  );
}

  ngOnInit() {
    this.dataSource;
  }

}
