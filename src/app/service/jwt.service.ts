import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class User {
  name: String;
  email: String;
  password: String;
  password_confirmation: String
}

@Injectable({
  providedIn: 'root'
})

export class JwtService {

  constructor(private http: HttpClient) { }

  signUp(user: User): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/register', user);
  }

  logIn(user: User): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/login', user);
  }

  profile(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/profile');
  }

  logout(user : User) : Observable<any>{
      return this.http.post<any>('http://127.0.0.1:8000/api/logout',user);
  }

}