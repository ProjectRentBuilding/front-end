import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {BuildingModel} from '../../../model/building.model';
import {BuildingService} from '../../../service/building.service';
import {MatDialog} from '@angular/material';
import {BuildingAddComponent} from '../building-add/building-add.component';
import {BuildingDeleteComponent} from '../building-delete/building-delete.component';
import {BuildingEditComponent} from '../building-edit/building-edit.component';
import {BuildingDetailComponent} from '../building-detail/building-detail.component';

@Component({
  selector: 'app-building-list',
  templateUrl: './building-list.component.html',
  styleUrls: ['./building-list.component.css']
})
export class BuildingListComponent implements OnInit, OnDestroy {

  public subscription: Subscription;
  public buildings: BuildingModel[];
  public totalRec: number;
  public page = 1;
  public searchText;

  constructor(
    public buildingService: BuildingService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.subscription = this.buildingService.findAll().subscribe((data: BuildingModel[]) => {
      this.buildings = data;
      this.totalRec = this.buildings.length;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  openDialogAddNew(): void {
    const dialogRef = this.dialog.open(BuildingAddComponent, {
      width: '1200px',
      height: '840px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  openDialogView(id): void {
    this.buildingService.findOne(id).subscribe(dataOfBuildingModel => {
      const dialogRef = this.dialog.open(BuildingDetailComponent, {
        width: '1200px',
        height: '840px',
        data: {data1: dataOfBuildingModel},
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    });
  }

  openDialogEdit(id): void {
    this.buildingService.findOne(id).subscribe(dataOfBuildingModel => {
      const dialogRef = this.dialog.open(BuildingEditComponent, {
        width: '1200px',
        height: '840px',
        data: {data1: dataOfBuildingModel},
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    });
  }


  openDialogDelete(id): void {
    this.buildingService.findOne(id).subscribe(dataOfBuildingModel => {
      const dialogRef = this.dialog.open(BuildingDeleteComponent, {
        width: '500px',
        height: '240px',
        data: {data1: dataOfBuildingModel},
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    });
  }
}
