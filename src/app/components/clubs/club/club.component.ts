import { Club } from './../../../models/club';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent implements OnInit {

  @Input() club: Club;

  constructor() { }

  ngOnInit(): void {
    // console.log(this.club.department);

  }

}
