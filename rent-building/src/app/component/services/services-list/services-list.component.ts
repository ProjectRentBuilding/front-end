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
import {ServicesDetailComponent} from "../services-detail/services-detail.component";
import {ServicesEditComponent} from "../services-edit/services-edit.component";
import {ServicesAddComponent} from "../services-add/services-add.component";


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

  openDialogDetail(id): void {
    this.servicesService.findOne(id).subscribe(dataOfEquipment => {
      const dialogRef = this.dialog.open(ServicesDetailComponent, {
        width: '500px',
        data: {data1: dataOfEquipment},
        disableClose: false,
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    });
  }

  openDialogAddNew(): void {
    const dialogRef = this.dialog.open(ServicesAddComponent, {
      width: '65%',
      height: '540px',
      disableClose: false,

    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  openDialogEdit(id): void {
    this.servicesService.findOne(id).subscribe(dataOfEquipment => {
      const dialogRef = this.dialog.open(ServicesEditComponent, {
        width: '500px',
        data: {data1: dataOfEquipment},
        disableClose: false,
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    });
  }
}
