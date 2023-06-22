import { Component,Input } from '@angular/core';
import {  faPen, faTrash , faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';
import { Question } from '../types/Question';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.css']
})
export class QuestionCardComponent {
  faTrash = faTrash;
  faPen = faPen;
  faArrowUpRightFromSquare = faArrowUpRightFromSquare;

  @Input () question!:Question;
  @Input () refreshData:any;
  @Input () thisReference:any;
  constructor(public dialog:MatDialog, private router:Router){
    
  }
 
  async openDialog(){
    const dialogRef = this.dialog.open(DeleteConfirmComponent,{
      width:"650px",
      height:"300px",
      data:{questionData:this.question, dialogMode:1}
    })

    dialogRef.afterClosed().subscribe(()=>{
      setTimeout(()=>{
        this.thisReference.fetchAllQuestions();
      },2000)
      
    });
  }
 
  toggleAreYouSure(){
    this.openDialog() ;
  }

  toggleEditMenu(){
      
      this.router.navigate(['/edit'], { queryParams: { id: this.question.questionId } });
  }

  seeQuestion(){
      this.router.navigate(['/view'], { queryParams: { id: this.question.questionId } });
  }
}
