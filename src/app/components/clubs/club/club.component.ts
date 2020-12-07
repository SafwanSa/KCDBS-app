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

  constructor(private clubService: ClubService) { }

  ngOnInit(): void {
    // console.log(this.club.department);

  }

  enroll(): void {
    this.clubService.enroll(this.club.id + '');
  }

}
