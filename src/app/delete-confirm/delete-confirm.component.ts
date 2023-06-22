import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QuestionsService } from '../services/questions.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css']
})
export class DeleteConfirmComponent {

  constructor(public dialogRef:MatDialogRef<DeleteConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data:any, private questionService:QuestionsService,private tostr:ToastrService){
  }

  closeDialog(){
    this.dialogRef.close();
  }

  deleteOneQuestion(){
    console.log(this.data.questionData.questionId);
    this.questionService.deleteAQuestion(this.data.questionData.questionId).subscribe({
      next:data=>{
        this.tostr.success("Întrebarea a fost ștearsă cu success!");
        this.dialogRef.close();
      },
      error:err=>{
        this.tostr.error("Am întâmpinat o problema la ștergerea întrebării");
        this.dialogRef.close();
      }
    });
  }

  deleteAllQuestions(){
    this.questionService.deleteAllQuestions().subscribe((data)=>{this.tostr.success("Intrebarile au fost sterse cu success!"); this.dialogRef.close();},(err)=>{console.log(err); this.tostr.error("Am întâmpinat o problema la ștergerea întrebărilor"); this.dialogRef.close();})
  }

  handleDelete(){
    if(this.data.dialogMode === 1){
      this.deleteOneQuestion();
    } else if(this.data.dialogMode === 2){
      this.deleteAllQuestions();
    }
  }

}
