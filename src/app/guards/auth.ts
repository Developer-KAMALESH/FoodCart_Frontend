import { Injectable } from '@angular/core';
import { ActivatedRoute, CanActivate, Router } from '@angular/router';
import { Auth } from '../services/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: Auth,
    private router: Router
  ){}

 canActivate(route: any, state: any): boolean {

  if(this.authService.isLoggedIn()){
    return true;
  }

  this.router.navigate(['/login'], {
    queryParams:{ returnUrl: state.url }
  });

  return false;

}

}