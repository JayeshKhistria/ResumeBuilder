import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginStatusService } from 'src/app/login-status.service';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css']
})
export class TemplateListComponent implements OnInit {

  constructor(private router:Router ,private status:LoginStatusService) {}

  ngOnInit(): void {
  }

}
