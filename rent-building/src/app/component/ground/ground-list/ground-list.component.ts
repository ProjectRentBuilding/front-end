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
import {FormBuilder, FormGroup} from "@angular/forms";
import {TypeGroundModel} from "../../../model/typeGround.model";
import {TypeGroundService} from "../../../service/type-ground.service";


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
  public typeGrounds: TypeGroundModel[] = [];
  public grounds: GroundModel[] = [];
  public grounds1: GroundModel[] = [];
  public size=5;
  public groundPage: any;
  public totalPages: number = 1;
  public pages = [];
  pageClicked:number=0;


  private searchForm: FormGroup;
  private searchNameFloor = "";
  private searchCodeGround = "";
  private searchArea=0;
  private searchNameTypeGround = "";
  private message="";

  constructor(
    public groundService: GroundService,
    public contractService: ContractService,
    public typeGroundService: TypeGroundService,
    public floorService: FloorService,
    public routerService: Router,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.subscription = this.floorService.findAll().subscribe((data: FloorModel[]) => {
      this.floors = data;
    });
    this.subscription = this.typeGroundService.findAll().subscribe((data: TypeGroundModel[]) => {
      this.typeGrounds = data;
    });
    this.subscription = this.contractService.findAll().subscribe((data: ContractModel[]) => {
      this.contracts = data;
    });
    this.subscription = this.groundService.findAll().subscribe((data: GroundModel[]) => {
      this.grounds1 = data;
    });
    this.searchForm = this.fb.group({
      searchNameFloor: [''],
      searchCodeGround: [''],
      searchArea: [''],
      searchNameTypeGround:['']
    });
    this.loadData(0);

  }

  loadData(page) {
    this.groundService.getGroundPageSearch(page,this.size,this.searchNameFloor,this.searchCodeGround,this.searchArea,this.searchNameTypeGround)
      .subscribe(
        data=>{
        this.pageClicked=page;
        this.groundPage=data;
        this.grounds=this.groundPage.content;
        this.totalPages=this.groundPage.totalPages;
        this.pages=Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
          if (this.grounds.length == 0) {
            this.message = "Không tìm thấy kết quả nào phù hợp";
          }else{
            this.message = "";
          }
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
      height: '80%',
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      this.loadData(this.pageClicked);
    });
  }
  openDialogView(id): void {
    this.groundService.findOne(id).subscribe(dataOfGroundModel => {
      const dialogRef = this.dialog.open(GroundDetailComponent, {
        width: '65%',
        height: '80%',
        data: {data1: dataOfGroundModel},
        disableClose: false,
      });
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
        this.loadData(this.pageClicked);
      });
    });
  }

  openDialogEdit(id): void {
    this.groundService.findOne(id).subscribe(dataOfGroundModel => {
      const dialogRef = this.dialog.open(GroundEditComponent, {
        width: '65%',
        height: '80%',
        data: {data1: dataOfGroundModel},
        disableClose: false,
      });
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
        this.loadData(this.pageClicked);
      });
    });
  }


  openDialogDelete(id): void {
    this.groundService.findOne(id).subscribe(dataOfGroundModel => {
      const dialogRef = this.dialog.open(GroundDeleteComponent, {
        width: '35%',
        data: {data1: dataOfGroundModel},
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
        this.loadData(this.pageClicked);
      });
    });
  }

  searchType(nameFloor: any) {
    this.searchNameFloor = nameFloor;

    this.loadData(0);
  }

  deleteAll() {
    for(let item=0;item <this.grounds.length;item++)
      this.groundService.delete(this.grounds[item].id).subscribe(data => {
      });
    this.redirectTo('grounds');
    this.groundService.showNotification('', 'Xoá tất cả thành công, chúc mừng bạn');
  }
  resetForm() {
    this.searchForm.reset();
    this.onSearch(0);
  }
  onSearch(page) {
    if (this.searchForm.value.searchNameFloor == null) {
      this.searchForm.value.searchNameFloor = "";
      this.searchNameFloor = this.searchForm.value.searchNameFloor;
    } else {
      this.searchNameFloor=this.searchForm.value.searchNameFloor;
    }
    if (this.searchForm.value.searchCodeGround == null) {
      this.searchForm.value.searchCodeGround = "";
      this.searchCodeGround = this.searchForm.value.searchCodeGround;
    } else {
      this.searchCodeGround=this.searchForm.value.searchCodeGround;
    }
    if (this.searchForm.value.searchArea == "" || this.searchForm.value.searchArea == null) {
      this.searchForm.value.searchArea = "";
      this.searchArea = 0;
    } else {
      this.searchArea = this.searchForm.value.searchArea;
    }
    if (this.searchForm.value.searchNameTypeGround == null) {
      this.searchForm.value.searchNameTypeGround = "";
      this.searchNameTypeGround = this.searchForm.value.searchNameTypeGround;
    } else {
      this.searchNameTypeGround=this.searchForm.value.searchNameTypeGround;
    }
    this.loadData(page);
  }
}



