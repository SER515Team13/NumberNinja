import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { UserService } from './shared/user.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/signin/signin.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './user/signup/signup.component';
import { appRoutes } from './routes';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AdminComponent } from './admin/admin.component';
//import { AppRoutingModule } from './app-routing.module';
import { MatTableModule, MatMenuModule, MatButtonModule, MatCardModule, MatToolbarModule } from '@angular/material' ;
import { MatSelectModule } from '@angular/material/select';
import { StudentToolbarComponent } from './toolbars/studenttoolbar/studenttoolbar.component';
import { TeacherToolbarComponent } from './toolbars/teachertoolbar/teachertoolbar.component';
import { AdminToolbarComponent } from './toolbars/admintoolbar/admintoolbar.component';
import { TeacherComponent } from './teacher/teacher.component';
import { StudentComponent } from './student/student.component';
import { CompareValidatorDirective } from './shared/compare-validator.directive'; 


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    UserComponent,
    SignInComponent,
    HomeComponent,
    AdminComponent,
    StudentToolbarComponent,
    TeacherToolbarComponent,
    AdminToolbarComponent,
    TeacherComponent,
    StudentComponent,
    CompareValidatorDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    //AppRoutingModule,
    MatTableModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule
  ],
  providers: [UserService, AuthGuard,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptor,
      multi : true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
