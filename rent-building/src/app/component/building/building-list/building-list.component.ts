import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {BuildingModel} from '../../../model/building.model';
import {BuildingService} from '../../../service/building.service';
import {MatDialog} from '@angular/material';
import {BuildingAddComponent} from '../building-add/building-add.component';
import {BuildingDeleteComponent} from '../building-delete/building-delete.component';
import {BuildingEditComponent} from '../building-edit/building-edit.component';
import {BuildingDetailComponent} from '../building-detail/building-detail.component';
import {Router} from "@angular/router";

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
    public routerService: Router,
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
  redirectTo(uri: string) {
    this.routerService.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.routerService.navigate([uri]));
  }

  openDialogAddNew(): void {
    const dialogRef = this.dialog.open(BuildingAddComponent, {
      width: '75%',
      height: '540px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  openDialogView(id): void {
    this.buildingService.findOne(id).subscribe(dataOfBuildingModel => {
      const dialogRef = this.dialog.open(BuildingDetailComponent, {

        width: '75%',
        height: '540px',
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
        width: '75%',
        height: '540px',
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
        width: '35%',
        height: '250px',
        data: {data1: dataOfBuildingModel},
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    });
  }

  deleteAll() {
    for(let item=0;item <this.buildings.length;item++)
      this.buildingService.delete(this.buildings[item].id).subscribe(data => {
      });
    this.redirectTo('buildings');
    this.buildingService.showNotification('', 'Xoá tất cả thành công, chúc mừng bạn');
  }
}
