import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ClubService } from '../../services/club.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {

  }

}
