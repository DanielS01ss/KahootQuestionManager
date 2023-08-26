import { Component } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { Router } from "@angular/router";
import { faUpload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  faPlus = faPlus;
  faQuestion = faQuestion;
  faDoorOpen = faDoorOpen;
  faUpload = faUpload;
  closedMenu = true;

  constructor(private router:Router){

  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  addQuestionNavigate(){
    this.router.navigate(['/add-question']);
  }

  seeQuestionsNavigate(){
    this.router.navigate(['/all-questions']);
  }

  uploadQuestionsFile(){
    this.router.navigate(['/upload']);
  }

  toggleMenu(){
    this.closedMenu = !this.closedMenu;
  }
} 
