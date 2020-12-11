import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from './../../../services/project.service';
import { Project } from './../../../models/project';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-projectCard',
  templateUrl: './projectCard.component.html',
  styleUrls: ['./projectCard.component.css']
})
export class ProjectCardComponent implements OnInit {

  @Input() project: Project;
  status: string;

  constructor(private projectService: ProjectService, private authService: AuthService) { }

  ngOnInit(): void {
    this.checkStatus();
  }

  volunteer(): void {
    this.projectService.addMemberToProject$(this.authService.user.id, this.project.id).subscribe(res => {
      if (res === 201) {
        console.log('User did volunteer successfully');
        this.status = 'Worker';
      }
    });
  }

  checkStatus(): void {
    this.projectService.getWorkStatus$(this.authService.user.id, this.project.id).subscribe(res => {
      if (res !== 333) {
        this.status = res;
      }
    });
  }

}
