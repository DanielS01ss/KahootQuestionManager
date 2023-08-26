import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginBoardComponent } from './login-board/login-board.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AllTasksComponent } from './all-tasks/all-tasks.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { AuthGuard } from './guard/auth.guard';
import { EditCardComponent } from './edit-card/edit-card.component';
import { SeeQuestionComponent } from './see-question/see-question.component';
import { UploadComponent } from './upload/upload.component';
import { Auth } from 'firebase-admin/lib/auth/auth';

const routes:Routes = [
  {path:'login', component:LoginBoardComponent},
  {path:'all-questions',component:AllTasksComponent,canActivate:[AuthGuard]},
  {path:'add-question', component:AddTaskComponent,canActivate:[AuthGuard]},
  {path:'edit', component:EditCardComponent,canActivate:[AuthGuard]},
  {path:'view', component:SeeQuestionComponent,canActivate:[AuthGuard]},
  {path:'upload', component:UploadComponent,canActivate:[AuthGuard]},
  {path:'**', component:NotFoundComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
