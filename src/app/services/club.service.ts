import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PathRequester } from '../shared/pathRequester';
import { Club } from '../models/club';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  constructor(private http: HttpClient, private path: PathRequester) { }

  getAllClubs$(): Observable<[Club]> {
    return this.http.post<[Club]>(this.path.getAllClubs, {});
  }

}
