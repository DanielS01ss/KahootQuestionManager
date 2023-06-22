import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { API_ENDPOINTS } from '../constants/apiEndpoints';
import { Observable } from 'rxjs';
import { Question } from '../types/Question';


@Injectable({
  providedIn: 'root'
})
export class QuestionsService {


  questions = [];
  constructor(private http:HttpClient) { 
    this.getAllQuestions();
  }

  getAQuestion(questionId:string):Observable<any>{
    const authToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${authToken}`)
    .set('Content-Type', 'application/json');
  
    const reqBody = {
      questionId:questionId
    }
    return this.http.post(`${API_ENDPOINTS.getAQuestion}`,reqBody,{headers});
  }

  deleteAQuestion(questionId:string):Observable<any>{
    const authToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${authToken}`)
    .set('Content-Type', 'application/json');
    return this.http.delete(`${API_ENDPOINTS.deleteQuestion}?id=${questionId}`,{headers});
  }


  deleteAllQuestions():Observable<any>{
    const authToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${authToken}`)
    .set('Content-Type', 'application/json');
    return this.http.delete(`${API_ENDPOINTS.deleteAllQuestions}`,{headers});
  }


  getAllQuestions():Observable<any>{

    const access_token = localStorage.getItem('access_token');
    
    const requestOptions =  new HttpHeaders({
        'Authorization':`Bearer ${access_token}`
      })

    return this.http.get(`${API_ENDPOINTS.getAllQuestions}`,{headers:requestOptions});
  }

  postOneQuestion(myQuestion:Question):Observable<any>{
    const access_token = localStorage.getItem('access_token');
    const requestOptions =  new HttpHeaders({
      'Authorization':`Bearer ${access_token}`
    })
    return this.http.post(`${API_ENDPOINTS.addQuestion}`,myQuestion,{headers:requestOptions});
  }

  updateAQuestion(questionToBeEdited:any):Observable<any>{
    const access_token = localStorage.getItem('access_token');
    const requestOptions =  new HttpHeaders({
      'Authorization':`Bearer ${access_token}`
    });
    return this.http.patch(`${API_ENDPOINTS.updateQuestion}`,questionToBeEdited,{headers:requestOptions});
  }
}
