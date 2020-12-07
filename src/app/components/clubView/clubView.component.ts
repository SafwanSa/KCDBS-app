import { UserService } from './../../services/user.service';
import { User } from './../../models/user';
import { ProjectService } from './../../services/project.service';
import { Project, ProjectStatusType } from './../../models/project';
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
  projectStatusTypes = ProjectStatusType.values();
  selectedStatus = '';
  members: [User];
  admins: [User];

  constructor(
    private clubService: ClubService,
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private userService: UserService
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
      this.userService.getClubMembers$(this.club?.id + '').subscribe(members => {
        this.members = members;
      });

      this.userService.getClubAdmins$(this.club?.id + '').subscribe(admins => {
        this.admins = admins;
      });
    });
  }

  onSelect(projectID: string, status: string): void {
    this.projectService.changeProjectStatus$(projectID, status).subscribe(() => {
      this.selectedStatus = status;
    });
  }

}
