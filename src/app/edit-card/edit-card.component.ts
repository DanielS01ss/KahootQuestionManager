import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { QuestionsService } from '../services/questions.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.css']
})
export class EditCardComponent {
  form!:FormGroup;
  question:any;
  questionId:String = '';

  constructor( private formBuilder:FormBuilder,private route: ActivatedRoute, private router:Router,private questionService:QuestionsService, private toastr:ToastrService){
    this.createForm();
    this.populateForm();
  }

  private populateForm(){
    const id = this.route.snapshot.queryParams['id'];


    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');
      if(id)
        this.questionId = id;
      if(!id){
        this.router.navigate(['/not-found']);
      } else {
        this.questionService.getAQuestion(id).subscribe(
          {

            next:data =>{
              this.question = {
                answer1:data.answer1,
                answer2:data.answer2,
                answer3:data.answer3,
                answer4:data.answer4,
                correctAnswers:data.correctAnswers,
                question:data.question
              }

              let isFirstChecked:boolean = false;
              let isSecondChecked:boolean = false;
              let isThirdChecked:boolean = false;
              let isFourthChecked:boolean = false;
              this.question.correctAnswers.arrayValue.values.forEach((element:any) => {
                if(element.stringValue === '1'){
                  isFirstChecked = true;
                } else if (element.stringValue === '2'){
                  isSecondChecked = true;
                } else if (element.stringValue === '3'){
                  isThirdChecked = true;
                } else if (element.stringValue === '4'){
                  isFourthChecked = true;
                }
              });

              this.form.patchValue({
                questionTitle:this.question.question.stringValue,
                answer1:this.question.answer1.stringValue,
                answer2:this.question.answer2.stringValue,
                answer3:this.question.answer3.stringValue,
                answer4:this.question.answer4.stringValue,
                isCheckedAnsw1:isFirstChecked,
                isCheckedAnsw2:isSecondChecked,
                isCheckedAnsw3:isThirdChecked,
                isCheckedAnsw4:isFourthChecked
              });
            },
            error:error =>{
              this.toastr.error("Am întâmpinat o problemă la preluarea întrebării"); 
              ///afisare mesaj renuntare
            }
          }
        );
      }
    })
  

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

  handleEditQuestion(){
    
    let correctAnswers = [];

    if(this.form.get('isCheckedAnsw1')?.value){
      correctAnswers.push('1');
    }
    if(this.form.get('isCheckedAnsw2')?.value){
      correctAnswers.push('2');
    }
    if(this.form.get('isCheckedAnsw3')?.value){
      correctAnswers.push('3');
    }
    if(this.form.get('isCheckedAnsw4')?.value){
      correctAnswers.push('4');
    }



    const questionUpdated = {
      docName:this.questionId,
      answer1:this.form.get('answer1')?.value,
      answer2:this.form.get('answer2')?.value,
      answer3:this.form.get('answer3')?.value,
      answer4:this.form.get('answer4')?.value,
      question:this.form.get('questionTitle')?.value,
      correctAnswers:correctAnswers
    };
    this.questionService.updateAQuestion(questionUpdated).subscribe(
      {
        next: data=>{
         this.toastr.success("Întrebarea a fost updatată cu success!");
         
        },
        error: error =>{
          console.log(error);
          this.toastr.error("Am întâmpinat o problema la updaterea întrebării");
        }
      }
    );
    
  }

  handleCancel(){
    this.router.navigate(['/all-questions']);
  }

}
 