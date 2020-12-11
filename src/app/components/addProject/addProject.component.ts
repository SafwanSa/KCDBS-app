import { Club } from './../../models/club';
import { ProjectType } from './../../models/project';
import { Router } from '@angular/router';
import { ProjectService } from './../../services/project.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-addProject',
  templateUrl: './addProject.component.html',
  styleUrls: ['./addProject.component.css']
})
export class AddProjectComponent implements OnInit {

  @Input() club: Club;

  form: FormGroup;
  loading = false;
  types: [ProjectType];
  serverMessage = '';

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      typeID: ['', [Validators.required]],
    });
    this.projectService.getAllProjectTypes$().subscribe(types => this.types = types);
  }

  get name(): any {
    return this.form.get('name');
  }

  get description(): any {
    return this.form.get('description');
  }

  get typeID(): any {
    return this.form.get('typeID');
  }

  onSubmit(): void {
    this.loading = true;
    const json = {
      name: this.name.value,
      description: this.description.value,
      typeID: this.typeID.value === '' ? null : this.typeID.value,
      clubID: this.club.id, // WHERE TO GET?
      startDate: this.getDate(new Date())
    };
    this.projectService.addProject$(json).subscribe(res => {
      if (res === 201) {
        console.log('Project has been added successfully');
        this.form.reset();
      }
      this.loading = false;
    });
  }

  getErrorMessage(): string {
    if (this.name.hasError('required')
      || this.description.hasError('required') || this.typeID.hasError('required')) {
      return 'You must enter a value';
    }
  }

  getDate(d: Date): string {
    // tslint:disable-next-line:variable-name
    const date_ob = d;

    // adjust 0 before single digit date
    const date = ('0' + date_ob.getDate()).slice(-2);

    // current month
    const month = ('0' + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    const year = date_ob.getFullYear();

    // prints date in YYYY-MM-DD format
    return (year + '-' + month + '-' + date);
  }

}
