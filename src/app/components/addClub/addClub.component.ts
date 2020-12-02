import { ClubService } from './../../services/club.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addClub',
  templateUrl: './addClub.component.html',
  styleUrls: ['./addClub.component.css']
})
export class AddClubComponent implements OnInit {

  form: FormGroup;
  loading = false;
  serverMessage = '';

  constructor(private fb: FormBuilder, private clubService: ClubService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: [''],
      address: [''],
      phone: [''],
      description: ['', [Validators.required]],
      departmentID: ['']
    });
  }

  get name(): any {
    return this.form.get('name');
  }

  get email(): any {
    return this.form.get('email');
  }

  get address(): any {
    return this.form.get('address');
  }

  get phone(): any {
    return this.form.get('phone');
  }

  get description(): any {
    return this.form.get('description');
  }

  get departmentID(): any {
    return this.form.get('departmentID');
  }

  getErrorMessage(): string {
    if (this.name.hasError('required')
      || this.description.hasError('required')) {
      return 'You must enter a value';
    }
  }

  onSubmit(): void {

  }

}
// id: number;
// name: string;
// email?: string;
// address?: string;
// status: string;
// phone?: string;
// description: string;
// department?: Department;
