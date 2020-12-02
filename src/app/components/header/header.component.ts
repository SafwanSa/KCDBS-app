import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User;
  isProcessing = true;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.observeAuthUser();
    console.log(this.user);
  }

  observeAuthUser(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
      this.isProcessing = false;
    });
  }

  signOut(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

}
