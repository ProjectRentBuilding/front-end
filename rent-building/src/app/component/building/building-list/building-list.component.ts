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
  public size=5;
  public buildingPage: any;
  public totalPages: number = 1;
  public pages = [];
  pageClicked:number=0;

  public subscription: Subscription;
  public buildings: BuildingModel[] = [];
  public searchText="";

  constructor(
    public buildingService: BuildingService,
    public routerService: Router,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.loadData(0);
  }
  loadData(page){
    this.buildingService.getBuildingPage(page,this.size,this.searchText)
      .subscribe(
        data=>{
          this.pageClicked=page;
          this.buildingPage=data;
          this.buildings=this.buildingPage.content;
          this.totalPages=this.buildingPage.totalPages;
          this.pages=Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
        }
      )
  }
  onNext() {
    // tslint:disable-next-line:triple-equals
    if (this.pageClicked == this.totalPages - 1) {
    } else {
      this.pageClicked++;
    }
    this.loadData(this.pageClicked);
  }

  onPrevious() {
    // tslint:disable-next-line:triple-equals
    if (this.pageClicked == 0) {
    } else {
      this.pageClicked--;
    }
    this.loadData(this.pageClicked);
  }

  onFirst() {
    this.pageClicked = 0;
    this.loadData(this.pageClicked);
  }

  onLast() {
    this.pageClicked = this.totalPages - 1;
    this.loadData(this.pageClicked);
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
      width: '65%',
      height: '540px',
      disableClose: false,

    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      this.loadData(this.pageClicked);
    });
  }
  openDialogView(id): void {
    this.buildingService.findOne(id).subscribe(dataOfBuildingModel => {
      const dialogRef = this.dialog.open(BuildingDetailComponent, {

        width: '65%',
        height: '540px',
        data: {data1: dataOfBuildingModel},
        disableClose: false,
      });
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
        this.loadData(this.pageClicked);
      });
    });
  }

  openDialogEdit(id): void {
    this.buildingService.findOne(id).subscribe(dataOfBuildingModel => {
      const dialogRef = this.dialog.open(BuildingEditComponent, {
        width: '65%',
        height: '540px',
        data: {data1: dataOfBuildingModel},
        disableClose: false,
      });
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
        this.loadData(this.pageClicked);
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
        this.loadData(this.pageClicked);
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
