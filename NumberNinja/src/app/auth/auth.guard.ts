import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../shared/user.service';
//import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService : UserService, private router : Router){}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
      if (localStorage.getItem('userToken') != null) {
        console.log("Token exists");
        if (this.userService.validateToken()) {
          console.log("Token is valid");
          return true;
        }
      }
      this.router.navigate(['/login']);
      return false;
  }
}