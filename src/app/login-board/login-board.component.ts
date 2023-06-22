import { Component } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-board',
  templateUrl: './login-board.component.html',
  styleUrls: ['./login-board.component.css']
})
export class LoginBoardComponent {
  
  form!:FormGroup;

  constructor(private formBuilder:FormBuilder, private tostr:ToastrService, private router:Router, private authService:AuthService){
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

  failed2():void{
    this.tostr.error('Credentialele sunt gresite!');
  }

  loginUser(){
    this.authService.login(this.form.get('username')?.value,this.form.get('password')?.value).subscribe((data)=>{localStorage.setItem('access_token',data.token); this.router.navigate(['/all-questions']);},(err)=>{

      if(err.status === 401)
      {
        this.failed2();
      } else {
        this.failed();
      }
      
      console.log(err);
    })
  }
  
}
