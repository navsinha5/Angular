import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  bypass:boolean;
  ngOnInit() {
    this.bypass = this.authService.isLoggedIn();
  }

  onLogout(event){
    this.authService.logout();
  }

}
