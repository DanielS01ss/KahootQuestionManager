import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { faC, faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { QuestionsService } from '../services/questions.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {

  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;
  faCloudArrowUp = faCloudArrowUp;
  faCircleQuestion = faCircleQuestion;
  displayTemplate = false;
  wrongExtensionError = false;
  uploadedFileInfoShown = false;
  fileIsUploading = false;

  faCircleInfo = faCircleInfo;

  selectedFile:File | null = null;

  constructor(private http: HttpClient, private questionsService:QuestionsService){}

  toggleDisplayTemplate(){
    this.displayTemplate = !this.displayTemplate;
  }

  triggerFileInput(){
    this.fileInputRef.nativeElement.click();
  }

  onFileSelected(event:any){
    this.wrongExtensionError = false;
    this.uploadedFileInfoShown = true;
    const maxSizeInBytes = 5 * 1024 * 1024;
    const allowedExtensions = ["csv","json"];
    this.selectedFile = event.target.files[0];
    const fileSizeInBytes = this.selectedFile?.size;
    if( fileSizeInBytes && fileSizeInBytes > maxSizeInBytes){
      this.uploadedFileInfoShown = false;
      alert("Fișierul este prea mare!");
      this.selectedFile = null;
      return;
      
    }
    const fileName = this.selectedFile?.name;
    const splittedFile = this.selectedFile?.name.split(".");
    if(splittedFile){
      const fileExtension = splittedFile[splittedFile?.length-1];
      if(!allowedExtensions.includes(fileExtension)){
        this.uploadedFileInfoShown = false;
          this.wrongExtensionError = true;
          return;
      }
      
    }

    if(this.selectedFile){
      const formData: FormData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      this.questionsService.uploadFileWithQuestions(formData).subscribe((resp)=>{
        console.log(resp);
      },(err)=>{
        console.log(err);
      });
    }
  }
}
