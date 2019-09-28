import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/signup/signup.component';
import { SignInComponent } from './user/signin/signin.component';
import { AuthGuard } from './auth/auth.guard';

export const appRoutes: Routes = [
    { 
        path: 'home', component: HomeComponent, 
        canActivate: [AuthGuard] 
    },
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {
        path : '', redirectTo:'/home', pathMatch: 'full'
    }    
];