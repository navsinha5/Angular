import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserCredentials } from '../../models/user-auth'
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() { }

  message: string;
  userCredentials: UserCredentials = {
    email: '',
    password: ''
  }

  onLogin(userCredentials){
    this.userCredentials.email = userCredentials.value.email;
    this.userCredentials.password = userCredentials.value.password;

    this.authService.authenticate(this.userCredentials, (status) => {
      if(status){
        this.router.navigate(['profile']);
      }else{
        this.message = 'Login failed';
      }
    });
  }

  oAuthLogin(){
    this.authService.oauth((oAuthUrl) => {
      window.location.href = oAuthUrl;
    });
  }

}
