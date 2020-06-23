import { Component, OnInit } from '@angular/core';
import {ServicesModel} from "../../../model/services.model";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ServicesService} from "../../../service/services.service";

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.css']
})
export class ServicesListComponent implements OnInit {
  public servicesModel: ServicesModel [] = [];

  constructor(
    private servicesService: ServicesService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.servicesService.findAll().subscribe((data: ServicesModel[]) => {
      this.servicesModel = data;
    });
  }

}
