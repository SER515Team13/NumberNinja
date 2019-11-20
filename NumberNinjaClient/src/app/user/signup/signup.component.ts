/**
 * @project NumberNinja
 * @author Sukhpreet Singh Anand, Abhinaw Sarang, Sagar Khar, Smit Shah
 */

import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../shared/user.model';
import { UserService } from '../../shared/user.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sign-up',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {
  user: User;
  emailPattern = "^[a-zA-Z0-9_\\-.]+@[a-zA-Z0-9\\-]+\.[a-zA-Z0-9\\-.]+$";
  confPassword: String = '';

  constructor(private userService: UserService, private toastr: ToastrService,public dialog: MatDialog) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.user = {
      userName: '',
      password: '',
      email: '',
      firstName: '',
      lastName: '',
      role: '',
      grade: ''
    };
  }

  OnSubmit(form: NgForm) {
    this.userService.registerUser(this.user)
      .subscribe((data: any) => {
        if (data.message === undefined) {
          this.resetForm(form);
          this.toastr.success('User registration successful');
        } else {
          this.toastr.error(data.message);
        }
      });
  }
  register(ref: TemplateRef<any>){
    this.dialog.open(ref);
  }
}
