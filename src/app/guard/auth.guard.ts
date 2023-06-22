import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: TokenService,
    private router: Router
  ) { }

  canActivate(): boolean {
    if (this.authService.tokenValidate()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}