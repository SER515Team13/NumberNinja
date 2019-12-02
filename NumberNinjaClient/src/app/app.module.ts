/**
 * @project NumberNinja
 * @author Sukhpreet Singh Anand, Abhinaw Sarang, Saksham Jhawar, Smit Shah, Sagar Khar
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
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
import { AdminComponent } from './admin/pending/admin.component';
import { MatTableModule, MatMenuModule, MatButtonModule, MatCardModule, MatToolbarModule, MatIconModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { StudentToolbarComponent } from './toolbars/studenttoolbar/studenttoolbar.component';
import { TeacherToolbarComponent } from './toolbars/teachertoolbar/teachertoolbar.component';
import { AdminToolbarComponent } from './toolbars/admintoolbar/admintoolbar.component';
import { TeacherComponent } from './teacher/teacher.component';
import { StudentComponent } from './student/student.component';
import { CompareValidatorDirective } from './shared/compare-validator.directive';
import { AssignmentsComponent } from './teacher/assignments/view-assignments/assignments.component';
import { HttpModule } from '@angular/http';
import { AssignmentService } from './teacher/service/assignment.service';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddAssignmentComponent } from './teacher/assignments/add-assignment/add-assignment.component';
import { QuestionComponent } from './teacher/question/question.component'; 
import { QuestionService } from './teacher/service/question-service';
import { QuestionListComponent } from './teacher/question-list/question-list.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { ViewAssignmentsComponent } from './student/assignments/view-assignments/view-assignments.component';
import { ViewQuestionsComponent } from './student/questions/view-questions/view-questions.component';
import { SolveQuestionComponent } from './student/canvas/solve-question/solve-question.component';
import { ExistuserComponent } from './admin/existuser/existuser.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TeachergradesComponent } from './teacher/teachergrades/teachergrades.component';
import { PlaygroundComponent } from './student/canvas/playground/playground.component';


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
    CompareValidatorDirective,
    AssignmentsComponent,
    AddAssignmentComponent,
    QuestionComponent,
    QuestionListComponent,
    ViewAssignmentsComponent,
    ViewQuestionsComponent,
    SolveQuestionComponent,
    ExistuserComponent,
    TeachergradesComponent,
    PlaygroundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    MatTableModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    MatToolbarModule,
    MatButtonToggleModule,
    DragDropModule
  ],
  providers: [UserService, AssignmentService, AuthGuard,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptor,
      multi : true
    }, QuestionService],
  bootstrap: [AppComponent],
  entryComponents: [AddAssignmentComponent, QuestionComponent],
  schemas: [ NO_ERRORS_SCHEMA ],
})

export class AppModule { }