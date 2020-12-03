import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PathRequester } from '../shared/pathRequester';
import { User } from '../models/user';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';

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

  signIn(email: string, password: string): Observable<User> {
    // const myheader = new HttpHeaders().set('Content-Type', 'application/json');
    let body = new HttpParams();
    body = body.set('email', email);
    body = body.set('password', password);
    return this.http.post<User>(this.path.getUser, body).pipe(map(user => {
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }
      return null;
    }, err => {
      console.log('Error while getting the user. ' + err);
      return null;
    }));
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }


  register(firstName: string, lastName: string, email: string, password: string, phone: string): Observable<User> {
    let body = new HttpParams();
    body = body.set('email', email);
    body = body.set('password', password);
    body = body.set('firstName', firstName);
    body = body.set('lastName', lastName);
    body = body.set('phone', phone);
    return this.http.post<User>(this.path.registerUser, body).pipe(map(user => {
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }
      return null;
    }, err => {
      console.log('Error while getting the user. ' + err);
      return null;
    }));
  }

}
