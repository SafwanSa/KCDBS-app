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

  constructor(private http: HttpClient, private path: PathRequester) { }

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

  addMember(userID, clubID): void {

  }

}
