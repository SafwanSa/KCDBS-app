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
  selectedUser: User;

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

  approve(user: User): void {
    this.clubService.approveMember(user.id + '', this.club?.id + '').subscribe(res => {
      if (res === 201) {
        console.log('Student has enrolled successfully');
        user.membershipStatus = 'Enrolled';
      }
    });
  }

  promote(role: string): void {
    const user = this.selectedUser;
    if (!user) { return; }
    this.clubService.changeRole(user.id + '', this.club?.id + '', role).subscribe(res => {
      if (res === 201) {
        console.log('Student\'s role has been changed successfully');
        const index = this.members.indexOf(user);
        this.members.splice(index, 1);
        this.admins.push(user);
        user.to = new Date();
      }
    });
  }

  assignWorker(event): void {
    this.projectService.addMemberToProject$(this.selectedUser.id, event.value).subscribe(res => {
      if (res === 201) {
        console.log('Member added successfully');
        event.value = null;
        this.selectedUser = null;
      }
    });

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
