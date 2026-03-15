import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = "";
  password = "";

  constructor(
  private authService: Auth,
  private router: Router,
  private route: ActivatedRoute
){}

  login(){

  this.authService.login("demo-token");

  const returnUrl =
    this.route.snapshot.queryParams['returnUrl'] || '/';

  this.router.navigate([returnUrl]);

}
}
