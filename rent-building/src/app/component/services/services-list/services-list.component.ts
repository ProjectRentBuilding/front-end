import {Component, OnDestroy, OnInit} from '@angular/core';
import {ServicesModel} from "../../../model/services.model";
import {MatDialog} from "@angular/material/dialog";
import {ServicesService} from "../../../service/services.service";

import {Subscription} from "rxjs";

import {ServicesDetailComponent} from "../services-detail/services-detail.component";
import {ServicesEditComponent} from "../services-edit/services-edit.component";
import {ServicesAddComponent} from "../services-add/services-add.component";
import {ServicesDeleteComponent} from "../services-delete/services-delete.component";
import {FormBuilder, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.css']
})
export class ServicesListComponent implements OnInit, OnDestroy {
  public servicesModel: ServicesModel [] = [];
  public services: ServicesModel [] = [];
  public subscription: Subscription;
  private searchForm: FormGroup;

  public page = 1;
  public size = 5;
  public servicePage: any;
  public totalPages: number = 1;
  public pages = [];
  pageClicked: number = 0;

  public searchNameService = "";
  public searchPeriodic = "";
  public searchConsume = 0;
  public searchMonthYear = "";
  public message = "";

  constructor(
    private servicesService: ServicesService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.servicesService.findAll().subscribe((data: ServicesModel[]) => {
      this.servicesModel = data;
    });
    this.searchForm = this.fb.group({
      searchNameService: [''],
      searchPeriodic: [''],
      searchConsume: [''],
      searchMonthYear:['']
    });
    this.loadData(0);
  }
  public loadData(page) {
    this.servicesService.getServicePageSearch(page, this.size, this.searchNameService, this.searchPeriodic, this.searchConsume, this.searchMonthYear)
      .subscribe(
        data => {
          this.pageClicked = page;
          this.servicePage = data;
          this.services = this.servicePage.content;
          this.totalPages = this.servicePage.totalPages;
          this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
          if (this.services.length == 0) {
            this.message = "Không tìm thấy kết quả nào phù hợp";
          } else {
            this.message = "";
          }
        }
      );

  }


  openDialogDetail(id): void {
    this.servicesService.findOne(id).subscribe(dataOfServiceModel => {
      const dialogRef = this.dialog.open(ServicesDetailComponent, {
        width: '65%',
        height: '80%',
        data: {data1: dataOfServiceModel},
        disableClose: false,
      });
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
        this.loadData(this.pageClicked);
      });
    });
  }

  openDialogAddNew(): void {
    const dialogRef = this.dialog.open(ServicesAddComponent, {
      width: '65%',
      height: '80%',
      disableClose: false,

    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      this.loadData(this.pageClicked);
    });
  }

  openDialogEdit(id): void {
    this.servicesService.findOne(id).subscribe(dataOfServiceModel => {
      const dialogRef = this.dialog.open(ServicesEditComponent, {
        width: '65%',
        height: '80%',
        data: {data1: dataOfServiceModel},
        disableClose: false,
      });
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
        this.loadData(this.pageClicked);
      });
    });
  }
  openDialogDelete(id): void {
    this.servicesService.findOne(id).subscribe(dataOfServiceModel => {
      const dialogRef = this.dialog.open(ServicesDeleteComponent, {
        width: '35%',
        height: '35%',
        data: {data1: dataOfServiceModel},
        disableClose: false,
      });
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
        this.loadData(this.pageClicked);
      });
    });
  }
  onNext() {
    if (this.pageClicked == this.totalPages - 1) {
    } else {
      this.pageClicked++;
    }
    this.loadData(this.pageClicked);
  }

  onPrevious() {
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

  onSearch(page) {
    if (this.searchForm.value.searchNameService == null) {
      this.searchForm.value.searchNameService = "";
      this.searchNameService = this.searchForm.value.searchNameService;
    } else {
      this.searchNameService=this.searchForm.value.searchNameService;
    }
    if (this.searchForm.value.searchPeriodic == null) {
      this.searchForm.value.searchPeriodic = "";
      this.searchPeriodic = this.searchForm.value.searchPeriodic;
    } else {
      this.searchPeriodic=this.searchForm.value.searchPeriodic;
    }
    if (this.searchForm.value.searchConsume == null || this.searchForm.value.searchConsume == "") {
      this.searchForm.value.searchConsume = 0;
      this.searchConsume = this.searchForm.value.searchConsume;
    } else {
      this.searchConsume=this.searchForm.value.searchConsume;
    }

    if (this.searchForm.value.searchMonthYear == null) {
      this.searchForm.value.searchMonthYear = "";
      this.searchMonthYear = this.searchForm.value.searchMonthYear;
    } else {
      this.searchMonthYear=this.searchForm.value.searchMonthYear;
    }
    this.loadData(page);
  }

  resetForm() {
    this.searchForm.reset();
    this.onSearch(0);
  }
}
