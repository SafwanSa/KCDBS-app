import { UserService } from './../../services/user.service';
import { User } from './../../models/user';
import { AuthService } from './../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from './../../services/project.service';
import { Project, ProjectStatusType } from './../../models/project';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  project: Project;
  projectStatusTypes = ProjectStatusType.values();
  selectedStatus = '';
  workers: [User];
  selectedUser: User;
  status: string;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.projectService.get$(id).subscribe(project => {
      if (!project) {
        this.router.navigateByUrl('/home');
        return;
      }
      this.project = project;
      this.checkStatus();
      this.projectService.getProjectWorkers$(this.project.id).subscribe(workers => {
        this.workers = workers;
      });
    });
  }

  onSelect(projectID: string, status: string): void {
    this.projectService.changeProjectStatus$(projectID, status).subscribe(() => {
      this.selectedStatus = status;
    });
  }

  promote(): void {
    this.projectService.promoteToLeader$(this.selectedUser.id, this.project.id).subscribe(res => {
      if (res === 201) {
        console.log('User promoted successfully');
        this.selectedUser.role = 'Leader';
        this.selectedUser = null;
      }
    });
  }

  checkStatus(): void {
    this.userService.getStatus$(this.project.clubID + '').subscribe(res => {
      console.log(res);

      if (res === 333) {
        this.status = 'Not Enrolled';
      } else {
        this.status = res;
      }
    });
  }

}
