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

const userRoles: String[] = ['student',
  'teacher'
];

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  private roles: String[] = userRoles;
  public allData: User[];
  private responseFromAPi;
  private dataSource = new MatTableDataSource<User>(this.responseFromAPi);
  private displayedColumns: String[] = ['firstName', 'lastName', 'email', 'role', 'action'];
  private roleControl = new FormControl('', [Validators.required]);

  constructor(public http: HttpClient, private userService:UserService) { }

  ngOnInit() {
    console.log("hii123");
    var userData = this.userService.getAllUserData().subscribe((data: any) => {
      if (data.key !== '') {
        console.log(data);
      } else {
        console.log("");
      }
      this.dataSource = new MatTableDataSource<User>(data);
    });
    console.log(userData);
    this.responseFromAPi = userData;
  }
  readonly rootUrl = 'http://localhost:3000';

  

  public acceptUser(selectedUser: User) {
    const data = this.dataSource.data;
    const index: number = data.indexOf(selectedUser);
    var callServertoAddRole = selectedUser;
    callServertoAddRole['flag'] = true;
    this.userService.addDelete(callServertoAddRole).subscribe((data:any) => {
      if(data.key !== '') {
        console.log(data);
      } else {
        console.log("failed");
      }
    });
    if (index !== -1) {
      data.splice(index, 1);
      this.dataSource.data = data;
      this.triggerEmail(selectedUser, true).subscribe(
        data => {
          let res: any = data;
          console.log("Mail has been sent to the user.");
        });

    }
    console.log(selectedUser);
  }

  public deleteUser(selectedUser: User) {
    const data = this.dataSource.data;
    const index: number = data.indexOf(selectedUser);
    var callServertoAddRole = selectedUser;
    callServertoAddRole['flag'] = false;
    this.userService.addDelete(callServertoAddRole).subscribe((data:any) => {
      if(data.key !== '') {
        console.log(data);
      } else {
        console.log("failed");
      }
    });
    if (index !== -1) {
      data.splice(index, 1);
      this.dataSource.data = data;
      this.triggerEmail(selectedUser, false).subscribe(
        data => {
          let res: any = data;
          console.log("Mail has been sent to the user.");
        });
    }
    console.log(selectedUser);
  }


  triggerEmail(currentUser: User, requestAccepted: boolean): Observable<{}> {
    console.log("Sending email to the User.");
    let body = {
      name: currentUser.firstName,
      email: currentUser.email,
      requestAccepted: requestAccepted
    }
    const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post(this.rootUrl + '/sendmail', body, { headers: reqHeader });
  }
}