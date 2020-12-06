import { ClubService } from './../../services/club.service';
import { Club } from './../../models/club';
import { User } from './../../models/user';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users = [];
  term = '';
  form: FormGroup;
  clubs: [Club];

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private clubService: ClubService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      userID: ['', []],
      clubID: ['', []]
    });

    this.userService.getAllUsers$().subscribe(users => {
      this.users = users;
    });

    this.clubService.getAllClubs$().subscribe(clubs => {
      this.clubs = clubs;
    });
  }

  get filteredUsers(): User[] {
    return this.users.filter(user => {
      return user.firstName.toLocaleLowerCase().startsWith(this.term.toLocaleLowerCase())
        || user.lastName.toLocaleLowerCase().startsWith(this.term.toLocaleLowerCase())
        || user.email.toLocaleLowerCase().startsWith(this.term.toLocaleLowerCase());
    });
  }

  get userID(): any {
    return this.form.get('userID');
  }

  get clubID(): any {
    return this.form.get('clubID');
  }

  getErrorMessage(): string {
    if (this.clubID.hasError('required')
      || this.userID.hasError('required')) {
      return 'You must enter a value';
    }
  }

}
