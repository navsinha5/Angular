import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { TokenResponse, UserCredentials, User, NewUser } from '../models/user-auth';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: Http, private router: Router) { }

  response: TokenResponse = {
    email: '',
    token: ''
  }

  public authenticate(userCredentials: UserCredentials, callback){
    this.http.post('http://localhost:3000/api/login', userCredentials).subscribe((data) => {
      this.response = data.json();
      this.saveToken(this.response.token);
      return callback(true);
    }, (err) => {
      return callback(false);
    });
  }

  private saveToken(token: string){
    localStorage.setItem('token', token);
  }

  private getToken(): string{
    return localStorage.getItem('token');
  }

  public logout(){
    localStorage.removeItem('token');
  }

  public isLoggedIn(): boolean{
    const token = this.getToken();
    if(!token){
      return false;
    }
    let payload = JSON.parse(window.atob(token.split('.')[1]));

    if(payload.exp > Date.now()/1000){
      return true;
    }
    return false;
  }

  public getUser(callback){
    if(!this.isLoggedIn()){
      return callback(false);
    }

    let user: User = {
      email: '',
      name: ''
    }

    this.http.get('http://localhost:3000/api/profile', 
    {headers: new Headers({'Authorization': `Bearer ${this.getToken()}`})}).subscribe(
      (data) => {
        user.name = data.json().name;
        user.email = data.json().email;
        return callback(user);
    },
     (err) => {
       console.log(err);
       return callback(false);
    });
  }

  public registerUser(user:NewUser, callback){
    this.http.post('http://localhost:3000/api/register', user).subscribe(
      (response) => {
        this.response = response.json();
        this.saveToken(this.response.token);
        callback(true);
    }, 
      (err) => {
        callback(false);
    });
  }

  public oauth(callback){
    this.http.get('http://localhost:3000/api/oauth')
    .subscribe(
      (res) => {
        callback(res.url);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
