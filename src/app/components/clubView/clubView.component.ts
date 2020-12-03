import { ActivatedRoute, Router } from '@angular/router';
import { Club } from './../../models/club';
import { ClubService } from './../../services/club.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-club-view',
  templateUrl: './clubView.component.html',
  styleUrls: ['./clubView.component.css']
})
export class ClubViewComponent implements OnInit {

  club?: Club;

  constructor(
    private clubService: ClubService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.clubService.get$(id).subscribe(club => {
      if (!club) {
        this.router.navigateByUrl('/clubs');
        return;
      }
      this.club = club;
      console.log(club);

    });
  }

}
