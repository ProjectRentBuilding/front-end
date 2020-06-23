import {Component, OnDestroy, OnInit} from '@angular/core';
import {ServicesModel} from "../../../model/services.model";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ServicesService} from "../../../service/services.service";
import {GroundService} from "../../../service/ground.service";
import {GroundModel} from "../../../model/ground.model";
import {Subscription} from "rxjs";
import {FloorService} from "../../../service/floor.service";
import {FloorModel} from "../../../model/floor.model";

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.css']
})
export class ServicesListComponent implements OnInit, OnDestroy {
  public servicesModel: ServicesModel [] = [];
  public grounds: GroundModel[] = [];
  public floors: FloorModel[] = [];
  public subscription: Subscription;

  constructor(
    private servicesService: ServicesService,
    private groundService: GroundService,
    private floorService: FloorService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    // alert("hello");
    this.servicesService.findAll().subscribe((data: ServicesModel[]) => {
      this.servicesModel = data;
      console.log(this.servicesModel);
    });

    this.groundService.findAll().subscribe((data: GroundModel[]) => {
      this.grounds = data;
      console.log(this.grounds);
    });

    this.subscription = this.floorService.findAll().subscribe((data: FloorModel[]) => {
      this.floors = data;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
