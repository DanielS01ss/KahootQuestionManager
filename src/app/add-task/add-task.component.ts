import { Component, Input } from '@angular/core';
import { MatFormField } from '@angular/material/form-field'; 
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ToastrService } from 'ngx-toastr';
import { Question } from '../types/Question';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { QuestionSubmit } from '../classes/QuestionSubmit';
import { QuestionsService } from '../services/questions.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {

    form!:FormGroup;
    questionTitle!:String;
    model:QuestionSubmit = new QuestionSubmit();
    firstCheckBox:boolean = false;
    secondCheckBox:boolean = false;
    thirdCheckBox:boolean = false;
    fourthCheckBox:boolean = false;
    validForm:boolean = false;
    constructor(private toastr:ToastrService, private formBuilder:FormBuilder, private questionService:QuestionsService){
      this.createForm();
    }
    
    handleAddQuestion(){
      let correctAnswers:Array<string> = [];
      if(this.form.get('isCheckedAnsw1')?.value === true){
        correctAnswers.push("1");
      }  
      if(this.form.get('isCheckedAnsw2')?.value === true){
        correctAnswers.push("2");
      }
      if(this.form.get('isCheckedAnsw3')?.value === true){
        correctAnswers.push("3");
      }
      if(this.form.get('isCheckedAnsw4')?.value === true){
        correctAnswers.push("4");
      }

      const newQuestionToBePosted:Question = {
          answer1:this.form.get('answer1')?.value,
          answer2:this.form.get('answer2')?.value,
          answer3:this.form.get('answer3')?.value,
          answer4:this.form.get('answer4')?.value,
          question:this.form.get('questionTitle')?.value,
          correctAnswers:[...correctAnswers]
      };

      this.questionService.postOneQuestion(newQuestionToBePosted).subscribe(
        {
          next: data=>{
            
            this.toastr.success("Întrebarea a fost postată cu success!");
            this.form.reset();
          },
          error: error =>{
            console.log(error);
            this.toastr.error("Am întâmpinat o problemă la postarea întrebării");
          }
        }
      );
     
      
    }

    private createForm():void{
      this.form = this.formBuilder.group({
        questionTitle:['', Validators.required],
        answer1:[null,Validators.required],
        answer2:[null,Validators.required],
        answer3:[null,Validators.required],
        answer4:[null,Validators.required],
        isCheckedAnsw1:false,
        isCheckedAnsw2:false,
        isCheckedAnsw3:false,
        isCheckedAnsw4:false
      })
    }

    validateCheckBox(){
      return this.form.get('isCheckedAnsw1')?.value === true || this.form.get('isCheckedAnsw2')?.value === true 
      || this.form.get('isCheckedAnsw3')?.value === true || this.form.get('isCheckedAnsw4')?.value === true;
    }
}
