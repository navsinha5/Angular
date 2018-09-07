import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { NewUser } from '../../models/user-auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
  }

  message:string;
  
  onSubmit(userData){
    let user:NewUser = {
      email: '',
      password: '',
      name: ''
    }
    user.email = userData.value.email;
    user.password = userData.value.password;
    user.name = userData.value.name;

    this.authService.registerUser(user, (status) => {
      if(!status){
        return this.message = 'Registration failed'
      }
      this.router.navigate(['profile']);
    })
  }

}
