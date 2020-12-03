import { Department } from './../models/department';
import { PathRequester } from './../shared/pathRequester';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {


  constructor(private http: HttpClient, private path: PathRequester) {

  }

  getAllDepartments$(): Observable<[Department]> {

    return this.http.post<[Department]>(this.path.getAllDepartments, {});
  }

}
