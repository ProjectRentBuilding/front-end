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
import {FormBuilder, FormGroup} from "@angular/forms";
import {FloorModel} from "../../../model/floor.model";


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
  public buildings1: BuildingModel[] = [];

  private searchForm: FormGroup;
  private searchNameBuilding = "";
  private searchTaxCode = "";
  private searchPhone = "";
  private searchAddress = "";
  private message = "";

  constructor(
    public buildingService: BuildingService,
    public routerService: Router,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.subscription = this.buildingService.findAll().subscribe((data: BuildingModel[]) => {
      this.buildings1 = data;
    });
    this.searchForm = this.fb.group({
      searchNameBuilding: [''],
      searchTaxCode: [''],
      searchPhone: [''],
      searchAddress:['']
    });
    this.loadData(0);
  }
  loadData(page){
    this.buildingService.getBuildingPageSearch(page,this.size,this.searchNameBuilding,this.searchTaxCode,this.searchPhone,this.searchAddress)
      .subscribe(
        data=>{
          this.pageClicked=page;
          this.buildingPage=data;
          this.buildings=this.buildingPage.content;
          this.totalPages=this.buildingPage.totalPages;
          this.pages=Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
          if (this.buildings.length == 0) {
            this.message = "Không tìm thấy kết quả nào phù hợp";
          }else{
            this.message = "";
          }
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
      height: '80%',
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
        height: '80%',
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
        height: '80%',
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
  resetForm() {
    this.searchForm.reset();
    this.onSearch(0);
  }
  onSearch(page) {
    if (this.searchForm.value.searchNameBuilding == null) {
      this.searchForm.value.searchNameBuilding = "";
      this.searchNameBuilding = this.searchForm.value.searchNameBuilding;
    } else {
      this.searchNameBuilding=this.searchForm.value.searchNameBuilding;
    }
    if (this.searchForm.value.searchTaxCode == null) {
      this.searchForm.value.searchTaxCode = "";
      this.searchTaxCode = this.searchForm.value.searchTaxCode;
    } else {
      this.searchTaxCode=this.searchForm.value.searchTaxCode;
    }
    if (this.searchForm.value.searchPhone == null) {
      this.searchForm.value.searchPhone = "";
      this.searchPhone = this.searchForm.value.searchPhone;
    } else {
      this.searchPhone=this.searchForm.value.searchPhone;
    }
    if (this.searchForm.value.searchAddress == null) {
      this.searchForm.value.searchAddress = "";
      this.searchAddress = this.searchForm.value.searchAddress;
    } else {
      this.searchAddress=this.searchForm.value.searchAddress;
    }
    this.loadData(page);
  }
}
