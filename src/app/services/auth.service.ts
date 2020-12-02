import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PathRequester } from '../shared/pathRequester';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User> = of(JSON.parse(localStorage.getItem('currentUser')) as User | null);

  constructor(
    private http: HttpClient,
    private path: PathRequester
  ) {

  }

  get isLoggedIn(): boolean {
    return !!this.user$;
  }

  signIn(email: string, password: string): void {
    // const myheader = new HttpHeaders().set('Content-Type', 'application/json');
    let body = new HttpParams();
    body = body.set('email', email);
    body = body.set('password', password);
    this.http.post<User>(this.path.getUser, body).subscribe(res => {
      if (res) {
        this.user$ = of(res);
        localStorage.setItem('currentUser', JSON.stringify(res));
        // localStorage.removeItem('currentUser');
      }
    }, err => {
      console.log('Error while getting the user. ' + err);
    });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.user$ = of(null);
  }

}
