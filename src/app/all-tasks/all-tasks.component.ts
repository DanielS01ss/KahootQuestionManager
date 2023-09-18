import { Component } from '@angular/core';
import { QuestionsService } from '../services/questions.service';
import { Question } from '../types/Question';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css']
})
export class AllTasksComponent {

  faMagnifyingGlass = faMagnifyingGlass;
  loading:boolean = true;
  allQuestions : Array<any> = [];
  filteredQuestions:Array<any> = [];
  constructor(private dialog:MatDialog, private questionService:QuestionsService, private tostr:ToastrService){
    this.fetchAllQuestions();
  }

  reference:any = this;
  fetchAllQuestions(){
    
    this.questionService.getAllQuestions().subscribe((data)=>{this.allQuestions = data.map((dt:any)=>{
     
      const objDate = dt.docData.questionDate;
      const secondsDate = objDate._seconds;
      const newDate = new Date(secondsDate * 1000);
      const formattedDate = `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`;
      let newObj:Question = {
        answer1 : dt.docData.answer1,
        answer2 : dt.docData.answer2,
        answer3 : dt.docData.answer3,
        answer4 : dt.docData.answer4,
        correctAnswers : dt.docData.correctAnswers,
        question : dt.docData.question,
        questionDate : formattedDate,
        questionId:dt.docId
      };
      
      return newObj;
      });
      this.filteredQuestions = this.allQuestions;
      this.loading = false;  
    }) 
  }

  async openDialog(){
    const dialogRef = this.dialog.open(DeleteConfirmComponent,{
      width:"650px",
      height:"300px",
      data:{questionData:{},dialogMode:2}
    });
    dialogRef.afterClosed().subscribe(()=>{
      this.loading = true;
      this.allQuestions = [];
      setTimeout(()=>{
        this.fetchAllQuestions();
      },5000);
    });
  }

  handleDeleteAllQuestions(){
      this.openDialog();
  }
}
