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
    this.clubService.enroll(this.club.id + '').subscribe(res => {
      if (res === 201) {
        console.log('Member has requested an enrollment successfully');
        this.checkStatus();
      }
    });
  }

  exitClub(): void {
    this.clubService.exitClub(this.club.id).subscribe(res => {
      if (res === 201) {
        console.log('Member has exited the club successfully');
        this.checkStatus();
      }
    });
  }

  checkStatus(): void {
    this.userService.getStatus$(this.club.id + '').subscribe(res => {
      if (res === 333) {
        this.status = 'Not Enrolled';
      } else {
        this.status = res;
      }
    });
  }

  O(): void { }

}
