import { User } from './../../models/user';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Club } from '../../models/club';
import { ClubService } from '../../services/club.service';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css']
})
export class ClubsComponent implements OnInit {

  clubs: [Club];

  constructor(private clubService: ClubService, public authService: AuthService) { }

  ngOnInit(): void {
    this.clubService.getAllClubs$().subscribe(clubs => {
      this.clubs = clubs;
      // console.log(clubs);
    });
  }

  get user(): User {
    return this.authService.user;
  }

}
