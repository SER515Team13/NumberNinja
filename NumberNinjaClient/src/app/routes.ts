import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/signup/signup.component';
import { SignInComponent } from './user/signin/signin.component';
import { AdminComponent } from './admin/admin.component';
import { TeacherComponent } from './teacher/teacher.component';
import { StudentComponent } from './student/student.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminComponent } from './admin/admin.component';

export const appRoutes: Routes = [
    {
        path: 'home', component: HomeComponent,
        canActivate: [AuthGuard] 
    },
    {
        path: 'admin', component: AdminComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'teacher', component: TeacherComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'student', component: StudentComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'login', component: AdminComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {
        path: '', redirectTo: '/home', pathMatch: 'full'
    }
];
