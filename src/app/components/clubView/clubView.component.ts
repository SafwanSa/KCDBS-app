import { ProjectService } from './../../services/project.service';
import { Project } from './../../models/project';
import { ActivatedRoute, Router } from '@angular/router';
import { Club } from './../../models/club';
import { ClubService } from './../../services/club.service';
import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-club-view',
  templateUrl: './clubView.component.html',
  styleUrls: ['./clubView.component.css']
})
export class ClubViewComponent implements OnInit {

  club?: Club;
  projects = [];

  constructor(
    private clubService: ClubService,
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const combined = combineLatest([this.clubService.get$(id), this.projectService.getAllProjects$(id)]);

    combined.subscribe(clubAndProjects => {
      if (!clubAndProjects[0]) {
        this.router.navigateByUrl('/clubs');
        return;
      }
      this.club = clubAndProjects[0];
      this.projects = clubAndProjects[1];
      if (this.projects.length === 0) { this.projects = null; }
    });
  }

}
