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

  constructor(private projectService: ProjectService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.projectService.get$(id).subscribe(project => {
      if (!project) {
        this.router.navigateByUrl('/home');
        return;
      }
      this.project = project;
    });
  }

  onSelect(projectID: string, status: string): void {
    this.projectService.changeProjectStatus$(projectID, status).subscribe(() => {
      this.selectedStatus = status;
    });
  }

}
