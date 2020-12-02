import { Component, OnInit } from '@angular/core';
import { Club } from '../../models/club';
import { ClubService } from '../../services/club.service';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css']
})
export class ClubsComponent implements OnInit {

  clubs: [Club];

  constructor(private clubService: ClubService) { }

  ngOnInit(): void {
    this.clubService.getAllClubs$().subscribe(clubs => { this.clubs = clubs; });
  }

}
