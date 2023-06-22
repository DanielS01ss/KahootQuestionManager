import { Component } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { QuestionsService } from '../services/questions.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-see-question',
  templateUrl: './see-question.component.html',
  styleUrls: ['./see-question.component.css']
}) 
export class SeeQuestionComponent {
  form!:FormGroup;
  questionId:String = '';
  question:any;
  firstAnswerCorrect:boolean = false;
  secondAnswerCorrect:boolean = false;
  thirdAnswerCorrect:boolean = false;
  fourthAnswerCorrect:boolean = false;
  dateObject: { seconds: string, nanos: number } = { seconds: '1687325854', nanos: 693000000 };
  formattedDate: string = '';
  loading = true;

  constructor(private formBuilder:FormBuilder,private route: ActivatedRoute, private router:Router, private questionService:QuestionsService, private toastr:ToastrService){
    this.createForm();
    this.populateForm();
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
              
              this.dateObject = data.questionDate.timestampValue;
              const seconds = parseInt(this.dateObject.seconds, 10);
              const milliseconds = seconds * 1000 + Math.floor(this.dateObject.nanos / 1000000);
              this.formattedDate = new Date(milliseconds).toLocaleString();

              let isFirstChecked:boolean = false;
              let isSecondChecked:boolean = false;
              let isThirdChecked:boolean = false;
              let isFourthChecked:boolean = false;
              this.question.correctAnswers.arrayValue.values.forEach((element:any) => {
                if(element.stringValue === '1'){
                  isFirstChecked = true;
                  this.firstAnswerCorrect = true;
                } else if (element.stringValue === '2'){
                  isSecondChecked = true;
                  this.secondAnswerCorrect = true;
                } else if (element.stringValue === '3'){
                  isThirdChecked = true;
                  this.thirdAnswerCorrect = true;
                } else if (element.stringValue === '4'){
                  isFourthChecked = true;
                  this.fourthAnswerCorrect = true;
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
              this.loading = false;
            },
            error:error =>{
              this.toastr.error("Am întâmpinat o problemă la preluarea întrebării"); 
        
            }
          }
        );
      }
    })
  

  }

  back(){
    this.router.navigate(['/all-questions']);
  }
}
