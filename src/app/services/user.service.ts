import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PathRequester } from '../shared/pathRequester';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private path: PathRequester, private authService: AuthService) { }

  getAllUsers$(): Observable<[User]> {
    return this.http.post<[User]>(this.path.getAllUsers, {});
  }

  getClubMembers$(clubID: string): Observable<[User]> {
    let body = new HttpParams();
    body = body.set('clubID', clubID);
    return this.http.post<[User]>(this.path.getClubMembers, body);
  }

  getClubAdmins$(clubID: string): Observable<[User]> {
    let body = new HttpParams();
    body = body.set('clubID', clubID);
    return this.http.post<[User]>(this.path.getClubAdmins, body);
  }

  getStatus$(clubID: string): Observable<any> {
    const userID = this.authService.user.id + '';
    let body = new HttpParams();
    body = body.set('clubID', clubID);
    body = body.set('userID', userID);
    return this.http.post(this.path.getStatus, body);
  }

}
