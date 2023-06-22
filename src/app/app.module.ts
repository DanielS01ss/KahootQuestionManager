import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { AllTasksComponent } from './all-tasks/all-tasks.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { LoginBoardComponent } from './login-board/login-board.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { QuestionCardComponent } from './question-card/question-card.component';
import {MatDialogModule} from "@angular/material/dialog";
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';
import {MatCheckboxModule} from '@angular/material/checkbox'
import { HttpClientModule } from '@angular/common/http';
import { EditCardComponent } from './edit-card/edit-card.component';
import { SeeQuestionComponent } from './see-question/see-question.component';


@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    AllTasksComponent,
    AddTaskComponent,
    LoginBoardComponent,
    NotFoundComponent,
    QuestionCardComponent,
    DeleteConfirmComponent,
    EditCardComponent,
    SeeQuestionComponent
  ],
  imports: [
    BrowserModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    MatDialogModule,
    MatCheckboxModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
