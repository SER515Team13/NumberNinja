/*
 * @project name: NumberNinja
 * @author: Sukhpreet Singh Anand
 */

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
/**
 * @project NumberNinja
 * @authors Sukhpreet Singh Anand, Abhinaw Sarang
 */

import { UserService } from '../shared/user.service';
// import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) { }

  /* An authentication guard utility to check whether access
   * to a particular page is allowed. This function validates
   * the user token generated during login and protects against
   * unauthorized access of webpages without logging in.
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (localStorage.getItem('userToken') != null) {
        console.log("User token exists.");
        if (this.userService.validateToken()) {
          console.log("User token is valid.");
          if (String(next.url).startsWith(localStorage.getItem('userRole'))) {
            return true;
          } else {
            this.router.navigate(['/'+localStorage.getItem('userRole')]);
            return false;
          }
        }
      }
      this.router.navigate(['/login']);
      return false;
  }
}
