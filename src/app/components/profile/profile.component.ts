import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
 
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthenticationService, private router: Router) { }

  name: string;
  email: string;

  ngOnInit() {
    this.authService.getUser(
      (user) => {
        if(!user){
          this.router.navigate(['login']);
        }
        this.name = user.name;
        this.email = user.email;
      }
    );
  }

  onLogout(event){
    this.authService.logout();
    this.router.navigate(['']);
  }

}
