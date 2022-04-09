import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';

import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

import User from './User';
import RegisterUser from './RegisterUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  /*TO DO*/ 

  /*getToken() – return type string*/  
  public getToken(): string | null {
    return localStorage.getItem('access_token');
  }
  /*readToken() – return type User */
  public readToken(): User | null {
    const token = localStorage.getItem('access_token');

    if(token){
      return helper.decodeToken(token);
    }else{
      return null;
    }
  }

  /*isAuthenticated() – return type Boolean*/

  isAuthenticated(): boolean{
    const token = localStorage.getItem('access_token');

    if(token){
      console.log('token exists');
      return true;
    }else{
      console.log('no token');
      return false;
    }
  }


  /* login(user) – return type Observable<any>*/
  login(user: User): Observable<any>{
    return this.http.post<any>(environment.userAPIBase + "/login", user);
  }

  /*logout()*/ 
  logout(): void{
    localStorage.removeItem('access_token');
  }

  /*register(registerUser) return type Observable<any>*/ 
  register(register: RegisterUser): Observable<any>{
    return this.http.post<any>(environment.userAPIBase + "/register", register);
  }
}
