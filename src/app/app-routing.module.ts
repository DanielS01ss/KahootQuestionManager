import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginBoardComponent } from './login-board/login-board.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes:Routes = [
  {path:'login', component:LoginBoardComponent},
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
