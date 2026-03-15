import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  login(token: string){
    localStorage.setItem('token', token);
  }

  logout(){
    localStorage.removeItem('token');
  }

  isLoggedIn(){
    return !!localStorage.getItem('token');
  }

}
