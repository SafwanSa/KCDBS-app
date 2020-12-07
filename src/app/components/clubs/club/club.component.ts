import { UserService } from './../../../services/user.service';
import { ClubService } from './../../../services/club.service';
import { Club } from './../../../models/club';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent implements OnInit {

  @Input() club: Club;
  status: string;

  constructor(private clubService: ClubService, private userService: UserService) { }

  ngOnInit(): void {
    this.status = 'Not Enrolled';
    this.checkStatus();
  }

  enroll(): void {
    this.clubService.enroll(this.club.id + '');
    this.checkStatus();
  }

  exitClub() {

  }

  checkStatus(): void {
    this.userService.getStatus$(this.club.id + '').subscribe(res => {
      if (res !== 404) {
        this.status = res;
      }
    });
  }

}
