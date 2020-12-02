import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PathRequester } from '../shared/pathRequester';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;

  constructor(
    private http: HttpClient,
    private path: PathRequester
  ) {
  }

  signIn(email: string, password: string) {
    const myheader = new HttpHeaders().set('Content-Type', 'application/json');
    let body = new HttpParams();
    body = body.set('email', email);
    body = body.set('password', password);
    this.http.post<User>(this.path.getUser, body).subscribe(res => {
      if (res) { this.user = res; }
    });
  }

}
