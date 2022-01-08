import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, serverAddr } from '@/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  public currentUser: User;
  public logIn: boolean = false;

  constructor(private http: HttpClient) {
    console.log("AuthenticationService constructor");
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  
  login(username, pwd): Observable<User> {
    let header = new HttpHeaders();
    header = header.append('Content-Type', 'application/json');
    const url = serverAddr + "/login";
    return this.http.post<User>(url,
      JSON.stringify({
        email: username,
        password: pwd,
      }),
      { headers: header });
  }

  logout() {
  }
}