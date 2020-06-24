import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {FloorModel} from '../../../model/floor.model';
import {FloorService} from '../../../service/floor.service';
import {MatDialog} from '@angular/material';

import {FloorDeleteComponent} from '../floor-delete/floor-delete.component';
import {FormArray, FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';

import {Router} from '@angular/router';
import {TypeFloorModel} from "../../../model/typeFloor.model";
import {TypeFloorService} from "../../../service/type-floor.service";
import {BuildingModel} from "../../../model/building.model";
import {BuildingService} from "../../../service/building.service";


@Component({
  selector: 'app-floor-list',
  templateUrl: './floor-list.component.html',
  styleUrls: ['./floor-list.component.css']
})
export class FloorListComponent implements OnInit, OnDestroy {

  public subscription: Subscription;
  public flag = false;
  public checkEdit = false;
  public checkAdd = false;
  public page = 1;

  private searchForm: FormGroup;
  public addFloorForm: FormGroup;
  public editFloorForm: FormGroup;
  public floor: FormArray;
  public floorOfId;
  public id: number;
  public getarray = 1;
  public typeFloors: TypeFloorModel[];
  public buildings: BuildingModel[];

  public floors: FloorModel[] = [];
  public floors1: FloorModel[] = [];
  public size = 5;
  public floorPage: any;
  public totalPages: number = 1;
  public pages = [];
  pageClicked: number = 0;

  private searchNameBuilding = "";
  private searchNameFloor = "";
  private searchArea = 0;
  private searchNameTypeFloor = "";
  private message = "";


  constructor(
    public formBuilder: FormBuilder,
    public floorService: FloorService,
    public typeFloorService: TypeFloorService,
    public buildingService: BuildingService,
    public dialog: MatDialog,
    public routerService: Router,
    private fb: FormBuilder
  ) {
    this.addFloorForm = this.formBuilder.group({
      floor: this.formBuilder.array([this.createFloor()])
    });
  }

  ngOnInit() {
    this.subscription = this.typeFloorService.findAll().subscribe((data: TypeFloorModel[]) => {
      this.typeFloors = data;
    });
    this.subscription = this.buildingService.findAll().subscribe((data: BuildingModel[]) => {
      this.buildings = data;
    });
    this.subscription = this.floorService.findAll().subscribe((data: FloorModel[]) => {
      this.floors1 = data;
    });
    this.editFloorForm = this.createFloor();
    this.searchForm = this.fb.group({
      searchNameBuilding: [''],
      searchNameFloor: [''],
      searchArea: [''],
      searchNameTypeFloor:['']
    });
      this.loadData(0);
  }

  loadData(page) {
    this.floorService.getFloorPageSearch(page, this.size, this.searchNameBuilding, this.searchNameFloor, this.searchArea, this.searchNameTypeFloor)
      .subscribe(
        data => {
          this.pageClicked = page;
          this.floorPage = data;
          this.floors = this.floorPage.content;
          this.totalPages = this.floorPage.totalPages;
          this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
          if (this.floors.length == 0) {
            this.message = "Không tìm thấy kết quả nào phù hợp";
          } else {
            this.message = "";
          }
        }
      );
  }

  searchBuildingIdType(name: string) {
    this.searchNameBuilding = name;
    this.loadData(0);
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

  get floorControls() {
    return this.addFloorForm.get('floor')['controls'];
  }

  createFloor(): FormGroup {
    return this.fb.group({
      nameFloor: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      codeFloor: ['', [Validators.required, Validators.pattern(/^MTL\d{3}$/)]],
      area: [''],
      capacity: [''],
      statusFloor: ['', [Validators.required]],
      typeFloorId: ['', [Validators.required]],
      buildingId: ['', [Validators.required]],
      id: [''],
    });
  }


  addNewArray(): void {
    if (!this.checkAdd) {
      this.checkAdd = !this.checkAdd;
    } else {
      this.getarray++;
      this.subscription = this.typeFloorService.findAll().subscribe((data: TypeFloorModel[]) => {
        this.typeFloors = data;
      });
      this.floor = this.addFloorForm.get('floor') as FormArray;
      this.floor.push(this.createFloor());
    }
  }

  addNewFloor() {
    this.floor = this.addFloorForm.get('floor') as FormArray;
    for (let tem = 0; tem < this.getarray; tem++) {
      // @ts-ignore
      this.floorService.save(this.floor.at(tem).value).subscribe(data => {
        this.floorService.showNotification('', 'Thêm mới thành công, chúc mừng bạn');

      });
    }
    this.redirectTo('floors');
    console.log(this.addFloorForm);
  }

  redirectTo(uri: string) {
    this.routerService.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.routerService.navigate([uri]));
  }


  checkEditFloor(id) {
    if (!this.checkEdit) {
      this.checkEdit = !this.checkEdit;
      this.flag = id;
      this.floorOfId = id;
      this.floorService.findOne(this.floorOfId).subscribe(data => {
        this.editFloorForm.patchValue(data);
      });
    }
  }

  editFloor() {
    console.log(this.editFloorForm.value);
    this.floorService.update(this.editFloorForm.value, this.floorOfId).subscribe(data => {
      this.redirectTo('floors');
      this.floorService.showNotification('', 'Sửa thành công, chúc mừng bạn');
    });
  }

  close() {
    this.redirectTo('floors');
  }

  openDialogDelete(id): void {
    this.floorService.findOne(id).subscribe(dataOfFloorModel => {
      const dialogRef = this.dialog.open(FloorDeleteComponent, {
        width: '500px',
        height: '240px',
        data: {data1: dataOfFloorModel},
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    });
  }

  removeFloor(i: number) {
    // if (i === 0) {
    //   this.checkAdd = false;
    // }
    this.floor.removeAt(i);
  }

  deleteAll() {
    for (let item = 0; item < this.floors.length; item++)
      this.floorService.delete(this.floors[item].id).subscribe(data => {
      });
    this.redirectTo('floors');
    this.floorService.showNotification('', 'Xoá tất cả thành công, chúc mừng bạn');
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
    if (this.searchForm.value.searchNameFloor == null) {
      this.searchForm.value.searchNameFloor = "";
      this.searchNameFloor = this.searchForm.value.searchNameFloor;
    } else {
      this.searchNameFloor=this.searchForm.value.searchNameFloor;
    }
    if (this.searchForm.value.searchArea == "" || this.searchForm.value.searchArea == null) {
      this.searchForm.value.searchArea = "";
      this.searchArea = 0;
    } else {
      this.searchArea = this.searchForm.value.searchArea;
    }
    if (this.searchForm.value.searchNameTypeFloor == null) {
      this.searchForm.value.searchNameTypeFloor = "";
      this.searchNameTypeFloor = this.searchForm.value.searchNameTypeFloor;
    } else {
      this.searchNameTypeFloor=this.searchForm.value.searchNameTypeFloor;
    }
    this.loadData(page);
  }
}
