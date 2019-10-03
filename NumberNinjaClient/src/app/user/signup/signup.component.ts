import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../shared/user.model';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {
  user: User;
  emailPattern = "^[a-zA-Z0-9_\\-.]+@[a-zA-Z0-9\\-]+\.[a-zA-Z0-9\\-.]+$";

  constructor(private userService: UserService, private toastr: ToastrService) { }

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
      lastName: ''
    };
  }

  OnSubmit(form: NgForm) {
    this.userService.registerUser(this.user)
      .subscribe((data: any) => {
        if (data.key !== '') {
          this.resetForm(form);
          this.toastr.success('User registration successful');
        } else {
          this.toastr.error('Registration failed');
        }
      });
  }
}
