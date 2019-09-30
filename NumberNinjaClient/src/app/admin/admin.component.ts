import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { HttpService } from "../shared/http.services";


export interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

const userRoles: String[] = ['Student',
  'Teacher'
];

const ELEMENT_DATA: User[] = [
  { firstName: 'Aloo', lastName: 'Pakode', email: 'asd@gingle.com', role: 'Student' },
  { firstName: 'Paratha', lastName: 'Shop', email: 'dada@eat.com', role: '' },
  { firstName: 'Abhinaw', lastName: 'Sarang', email: 'abhinaw.sarang@gmail.com', role: 'Student' },
  { firstName: 'Sukhy', lastName: 'Anand', email: 'Badebhaiya@gmail.com', role: 'Student' },
  { firstName: 'Smit', lastName: 'Shah', email: 'sshah73@asu.edu', role: 'Student' },
  { firstName: 'Saksham', lastName: 'Jhawar', email: 'sjhawar2@asu.edu', role: 'Teacher' },
  { firstName: 'Sagar', lastName: 'Khar', email: 'sagark93@gmail.com', role: 'Student' },
  { firstName: 'Abcd', lastName: 'Dsef', email: 'adv@sas.org', role: '' },
  { firstName: 'asdf', lastName: 'sdf', email: 'wee3@eee.eed', role: 'Teacher' },
  { firstName: 'ded', lastName: 'edd', email: 'ded.edd@wer.com', role: 'Student' },
];


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  private roles: String[] = userRoles;
  private dataSource = new MatTableDataSource(ELEMENT_DATA);
  private displayedColumns: String[] = ['firstName', 'lastName', 'email', 'role', 'action'];
  private roleControl = new FormControl('', [Validators.required]);

  ngOnInit() {
  }

  constructor(public http: HttpService) {
  }

  public acceptUser(selectedUser: User) {
    const data = this.dataSource.data;
    const index: number = data.indexOf(selectedUser);
    if (index !== -1) {
      data.splice(index, 1);
      this.dataSource.data = data;
      this.triggerEmail(selectedUser, true);
    }
  }

  public deleteUser(selectedUser: User) {
    const data = this.dataSource.data;
    const index: number = data.indexOf(selectedUser);

    if (index !== -1) {
      data.splice(index, 1);
      this.dataSource.data = data;
      this.triggerEmail(selectedUser, false);
    }
  }

  triggerEmail(currentUser: User, requestAccepted: boolean) {
    let user = {
      name: currentUser.firstName,
      email: currentUser.email,
      requestAccepted: requestAccepted
    }
    this.http.sendEmail("http://localhost:3000/sendmail", user).subscribe(
      data => {
        let res: any = data;
        console.log("Mail has been sent to the user.");
      }
    );
  }
}