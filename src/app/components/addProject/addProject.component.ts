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
      startDate: '2020-12-12'
    };
    this.projectService.addProject(json);
    this.loading = false;
  }

  getErrorMessage(): string {
    if (this.name.hasError('required')
      || this.description.hasError('required') || this.typeID.hasError('required')) {
      return 'You must enter a value';
    }
  }

}
