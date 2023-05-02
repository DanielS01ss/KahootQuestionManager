import { Component } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-board',
  templateUrl: './login-board.component.html',
  styleUrls: ['./login-board.component.css']
})
export class LoginBoardComponent {
  
  form!:FormGroup;

  constructor(private formBuilder:FormBuilder, private tostr:ToastrService){
    this.createForm();
  }

  private createForm():void{
    this.form = this.formBuilder.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }

  failed():void{
    this.tostr.error('Am intampinat o eroare in timpul logarii, te rog revino mai tarziu');
  }
  
}
