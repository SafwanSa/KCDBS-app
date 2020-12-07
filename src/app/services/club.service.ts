import { AuthService } from './auth.service';
import { Club } from './../models/club';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PathRequester } from '../shared/pathRequester';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  constructor(private http: HttpClient, private path: PathRequester, private authService: AuthService) { }

  getAllClubs$(): Observable<[Club]> {
    return this.http.post<[Club]>(this.path.getAllClubs, {});
  }

  get$(id: string): Observable<Club> {
    let body = new HttpParams();
    body = body.set('id', id);
    return this.http.post<Club>(this.path.getClub, body);
  }

  addClub(clubJSON: any): void {
    let body = new HttpParams();
    // tslint:disable-next-line:forin
    for (const key in clubJSON) {
      const value = clubJSON[key];
      body = body.set(key, value + '');
    }
    this.http.post(this.path.addClub, body).subscribe(res => {
      if (res === 201) {
        console.log('Club has been added successfully');
      }
    });
  }

  enroll(clubID: string): void {
    const userID = this.authService.user.id;
    let body = new HttpParams();
    body = body.set('userID', userID + '');
    body = body.set('clubID', clubID);
    body = body.set('fromDate', this.getDate(new Date()));
    this.http.post(this.path.requestEnrollment, body).subscribe(res => {
      if (res === 201) {
        console.log('Member has requested an enrollment successfully');
      }
    });
  }

  addMember(userID: string, clubID: string): void {
    let body = new HttpParams();
    body = body.set('userID', userID);
    body = body.set('clubID', clubID);
    body = body.set('fromDate', this.getDate(new Date()));
    this.http.post(this.path.addMemberToClub, body).subscribe(res => {
      if (res === 201) {
        console.log('Student has enrolled successfully');
      }
    });
  }

  approveMember(userID: string, clubID: string): Observable<any> {
    let body = new HttpParams();
    body = body.set('userID', userID);
    body = body.set('clubID', clubID);
    body = body.set('fromDate', this.getDate(new Date()));
    return this.http.post(this.path.approveMember, body);
  }

  changeRole(userID: string, clubID: string, role: string): Observable<any> {
    let body = new HttpParams();
    body = body.set('userID', userID);
    body = body.set('clubID', clubID);
    body = body.set('toDate', this.getDate(new Date()));
    body = body.set('role', role);
    return this.http.post(this.path.changeRole, body);
  }

  getDate(d: Date): string {
    // tslint:disable-next-line:variable-name
    const date_ob = d;

    // adjust 0 before single digit date
    const date = ('0' + date_ob.getDate()).slice(-2);

    // current month
    const month = ('0' + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    const year = date_ob.getFullYear();

    // prints date in YYYY-MM-DD format
    return (year + '-' + month + '-' + date);
  }

}
