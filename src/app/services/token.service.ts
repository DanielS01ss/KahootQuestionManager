import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private router:Router) { 

  }

  public tokenValidate():boolean{
    const token:any = localStorage.getItem('access_token');
    try{
      jwtDecode(token);
      
    } catch(err){
      localStorage.removeItem('access_token');
      this.router.navigate(['login']);
      return false;
    }

    const expirationDate = new Date(0);
    const decodedAuthToken: any = jwtDecode(token);
    expirationDate.setUTCSeconds(decodedAuthToken.exp);
    const isExpiredAuth = expirationDate < new Date();
    if (isExpiredAuth) {
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }
}
