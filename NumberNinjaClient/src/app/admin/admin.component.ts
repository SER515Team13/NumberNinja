import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { HttpService } from "../shared/http.services";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';


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
  // { firstName: 'Aloo', lastName: 'Pakode', email: 'asd@gingle.com', role: 'Student' },
  // { firstName: 'Paratha', lastName: 'Shop', email: 'dada@eat.com', role: '' },
  // { firstName: 'Abhinaw', lastName: 'Sarang', email: 'abhinaw.sarang@gmail.com', role: 'Student' },
  // { firstName: 'Sukhy', lastName: 'Anand', email: 'Badebhaiya@gmail.com', role: 'Student' },
  // { firstName: 'Smit', lastName: 'Shah', email: 'sshah73@asu.edu', role: 'Student' },
  // { firstName: 'Saksham', lastName: 'Jhawar', email: 'sjhawar2@asu.edu', role: 'Teacher' },
  // { firstName: 'Sagar', lastName: 'Khar', email: 'sagark93@gmail.com', role: 'Student' },
  // { firstName: 'Abcd', lastName: 'Dsef', email: 'adv@sas.org', role: '' },
  // { firstName: 'asdf', lastName: 'sdf', email: 'wee3@eee.eed', role: 'Teacher' },
  // { firstName: 'ded', lastName: 'edd', email: 'ded.edd@wer.com', role: 'Student' },
];


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  private roles: String[] = userRoles;
  public allData: User[];
  private dataSource ;
  // private dataSource = this.userService.getAllUserData().subscribe();
  private displayedColumns: String[] = ['firstName', 'lastName', 'email', 'role', 'action'];
  private roleControl = new FormControl('', [Validators.required]);

  ngOnInit() {
    console.log("hii123");
    var responseFromAPi;
    var userData = this.userService.getAllUserData();
    // responseFromAPi = values;
    // console.log(values)});
    // console.log(responseFromAPi  + "hiiiiii");
  }
  readonly rootUrl = 'http://localhost:3000';

  constructor(public http: HttpClient, private userService:UserService) { }

  public acceptUser(selectedUser: User) {
    const data = this.dataSource.data;
    const index: number = data.indexOf(selectedUser);
    if (index !== -1) {
      data.splice(index, 1);
      this.dataSource.data = data;
      this.triggerEmail(selectedUser, true).subscribe(
        data => {
          let res: any = data;
          console.log("Mail has been sent to the user.");
        });

    }
  }

  public deleteUser(selectedUser: User) {
    const data = this.dataSource.data;
    const index: number = data.indexOf(selectedUser);

    if (index !== -1) {
      data.splice(index, 1);
      this.dataSource.data = data;
      this.triggerEmail(selectedUser, false).subscribe(
        data => {
          let res: any = data;
          console.log("Mail has been sent to the user.");
        });
    }
  }


  triggerEmail(currentUser: User, requestAccepted: boolean): Observable<{}> {
    console.log("Sending email to the User.");
    let body = {
      name: currentUser.firstName,
      email: currentUser.email,
      requestAccepted: requestAccepted
    }
    //return this.http.sendEmail("http://localhost:3000/sendmail", body)
    const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post(this.rootUrl + '/sendmail', body, { headers: reqHeader });
  }
}