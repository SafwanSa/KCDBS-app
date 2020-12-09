import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from './../../services/project.service';
import { Project, ProjectStatusType } from './../../models/project';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

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

  constructor(private projectService: ProjectService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.projectService.get$(id).subscribe(project => {
      if (!project) {
        this.router.navigateByUrl('/home');
        return;
      }
      this.project = project;
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

}
