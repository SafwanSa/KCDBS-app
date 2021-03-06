import { DepartmentService } from './../../services/department.service';
import { Department } from './../../models/department';
import { ClubService } from './../../services/club.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-addClub',
  templateUrl: './addClub.component.html',
  styleUrls: ['./addClub.component.css']
})
export class AddClubComponent implements OnInit {

  form: FormGroup;
  loading = false;
  serverMessage = '';
  departments: [Department];

  constructor(
    private fb: FormBuilder,
    private clubService: ClubService,
    private departmentService: DepartmentService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      address: [''],
      phone: [''],
      description: ['', [Validators.required]],
      departmentID: ['']
    });

    this.departmentService.getAllDepartments$().subscribe(departments => this.departments = departments);
  }

  get name(): any {
    return this.form.get('name');
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
    const json = {
      name: this.name.value,
      description: this.description.value,
      phone: this.phone.value === '' ? null : this.phone.value,
      address: this.address.value === '' ? null : this.address.value,
      departmentID: this.departmentID.value === '' ? null : this.departmentID.value
    };
    this.clubService.addClub(json);
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
