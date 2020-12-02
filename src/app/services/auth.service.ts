import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PathRequester } from '../shared/pathRequester';
import { User } from '../models/user';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public user$: Observable<User>;

  constructor(private http: HttpClient, private path: PathRequester) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.user$ = this.currentUserSubject.asObservable();
  }

  get user(): User {
    return this.currentUserSubject.value;
  }

  get isLoggedIn(): boolean {
    return !!this.user$;
  }

  signIn(email: string, password: string): void {
    // const myheader = new HttpHeaders().set('Content-Type', 'application/json');
    let body = new HttpParams();
    body = body.set('email', email);
    body = body.set('password', password);
    this.http.post<User>(this.path.getUser, body).subscribe(user => {
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      }
    }, err => {
      console.log('Error while getting the user. ' + err);
    });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

}
