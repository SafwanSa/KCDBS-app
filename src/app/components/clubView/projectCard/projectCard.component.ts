import { Project } from './../../../models/project';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-projectCard',
  templateUrl: './projectCard.component.html',
  styleUrls: ['./projectCard.component.css']
})
export class ProjectCardComponent implements OnInit {

  @Input() project: Project;

  constructor() { }

  ngOnInit(): void {
  }

}
