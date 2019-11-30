/**
 * @project NumberNinja
 * @author Sukhpreet Singh Anand, Abhinaw Sarang, Saksham Jhawar, Sagar Khar
 */

import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/signup/signup.component';
import { SignInComponent } from './user/signin/signin.component';
import { AdminComponent } from './admin/pending/admin.component';
import { TeacherComponent } from './teacher/teacher.component';
import { StudentComponent } from './student/student.component';
import { QuestionListComponent } from './teacher/question-list/question-list.component'
import { AuthGuard } from './auth/auth.guard';
import { ViewQuestionsComponent } from './student/questions/view-questions/view-questions.component';
import { SolveQuestionComponent } from './student/canvas/solve-question/solve-question.component';
import { ExistuserComponent } from './admin/existuser/existuser.component';
import { TeachergradesComponent } from './teacher/teachergrades/teachergrades.component';
import { PlaygroundComponent } from './student/canvas/playground/playground.component';

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
        path: 'admin/existingusers', component: ExistuserComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'teacher/teachergrades', component: TeachergradesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'teacher', component: TeacherComponent,
        canActivate: [AuthGuard]
    },
    { 
        path: 'teacher/:id', component: QuestionListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'student/canvas/playground', component: PlaygroundComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'student', component: StudentComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'student/:id', component: ViewQuestionsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'student/canvas/:id', component: SolveQuestionComponent,
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
        path: '', redirectTo: '/home', pathMatch: 'full'
    }
];
