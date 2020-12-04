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

}
