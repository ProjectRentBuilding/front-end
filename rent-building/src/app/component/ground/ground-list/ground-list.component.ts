import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {GroundModel} from '../../../model/ground.model';
import {MatDialog} from '@angular/material';
import {GroundService} from '../../../service/ground.service';
import {GroundDeleteComponent} from '../ground-delete/ground-delete.component';
import {GroundAddComponent} from '../ground-add/ground-add.component';
import {GroundDetailComponent} from '../ground-detail/ground-detail.component';
import {GroundEditComponent} from '../ground-edit/ground-edit.component';
import {ContractService} from "../../../service/contract.service";
import {ContractModel} from "../../../model/contract";
import {FloorModel} from "../../../model/floor.model";
import {FloorService} from "../../../service/floor.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-ground-list',
  templateUrl: './ground-list.component.html',
  styleUrls: ['./ground-list.component.css']
})
export class GroundListComponent implements OnInit, OnDestroy {
  public subscription: Subscription;

  public contracts: ContractModel[];
  public page = 1;
  public floors: FloorModel[];

  public grounds: GroundModel[] = [];
  public size=5;
  public groundPage: any;
  public totalPages: number = 1;
  public pages = [];
  pageClicked:number=0;
  public searchText="";

  constructor(
    public groundService: GroundService,
    public contractService: ContractService,
    public floorService: FloorService,
    public routerService: Router,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.subscription = this.floorService.findAll().subscribe((data: FloorModel[]) => {
      this.floors = data;
    });
    this.subscription = this.contractService.findAll().subscribe((data: ContractModel[]) => {
      this.contracts = data;
    });
    this.loadData(0);

  }

  loadData(page) {
    this.groundService.getGroundPage(page,this.size,this.searchText)
      .subscribe(
        data=>{
        this.pageClicked=page;
        this.groundPage=data;
        this.grounds=this.groundPage.content;
        this.totalPages=this.groundPage.totalPages;
        this.pages=Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
    });
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
    const dialogRef = this.dialog.open(GroundAddComponent, {
      width: '65%',
      height: '540px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  openDialogView(id): void {
    this.groundService.findOne(id).subscribe(dataOfGroundModel => {
      const dialogRef = this.dialog.open(GroundDetailComponent, {
        width: '65%',
        height: '540px',
        data: {data1: dataOfGroundModel},
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    });
  }

  openDialogEdit(id): void {
    this.groundService.findOne(id).subscribe(dataOfGroundModel => {
      const dialogRef = this.dialog.open(GroundEditComponent, {
        width: '65%',
        height: '540px',
        data: {data1: dataOfGroundModel},
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    });
  }


  openDialogDelete(id): void {
    this.groundService.findOne(id).subscribe(dataOfGroundModel => {
      const dialogRef = this.dialog.open(GroundDeleteComponent, {
        width: '35%',
        height: '250px',
        data: {data1: dataOfGroundModel},
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    });
  }

  searchType(codeFloor: any) {
    this.searchText = codeFloor;
  }

  deleteAll() {
    for(let item=0;item <this.grounds.length;item++)
      this.groundService.delete(this.grounds[item].id).subscribe(data => {
      });
    this.redirectTo('grounds');
    this.groundService.showNotification('', 'Xoá tất cả thành công, chúc mừng bạn');
  }
}



