import { User } from './../models/user';
import { Project, ProjectType } from './../models/project';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PathRequester } from '../shared/pathRequester';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient, private path: PathRequester) { }

  getAllProjects$(clubID: string): Observable<[Project]> {
    let body = new HttpParams();
    body = body.set('id', clubID);
    return this.http.post<[Project]>(this.path.getClubProjects, body);
  }

  get$(id: string): Observable<Project> {
    let body = new HttpParams();
    body = body.set('id', id);
    return this.http.post<Project>(this.path.getProject, body);
  }

  changeProjectStatus$(projectID: string, newStatus: string): Observable<Project> {
    let body = new HttpParams();
    body = body.set('id', projectID);
    body = body.set('status', newStatus);
    return this.http.post<Project>(this.path.getChangeProjectStatus, body);
  }

  getAllProjectTypes$(): Observable<[ProjectType]> {
    return this.http.post<[ProjectType]>(this.path.getAllProjectTypes, {});
  }

  addProject(project: any): void {
    let body = new HttpParams();
    // tslint:disable-next-line:forin
    for (const key in project) {
      const value = project[key];
      body = body.set(key, value + '');
    }
    this.http.post(this.path.addProject, body).subscribe(res => {
      if (res === 201) {
        console.log('Project has been added successfully');
      }
    });
  }

  addMemberToProject$(userID: number, projectID: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('projID', projectID + '');
    body = body.set('userID', userID + '');
    body = body.set('fromDate', this.getDate(new Date()) + '');
    return this.http.post(this.path.addMemberToProject, body);
  }

  promoteToLeader$(userID: number, projectID: number): Observable<any> {
    let body = new HttpParams();
    body = body.set('projID', projectID + '');
    body = body.set('userID', userID + '');
    return this.http.post(this.path.promoteToLeader, body);
  }

  getProjectWorkers$(projectID: number): Observable<[User]> {
    let body = new HttpParams();
    body = body.set('projID', projectID + '');
    return this.http.post<[User]>(this.path.getProjectWorkers, body);
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
