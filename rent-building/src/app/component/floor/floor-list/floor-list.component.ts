import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {FloorModel} from '../../../model/floor.model';
import {FloorService} from '../../../service/floor.service';
import {MatDialog} from '@angular/material';

import {FloorDeleteComponent} from '../floor-delete/floor-delete.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Router} from '@angular/router';
import {TypeFloorModel} from "../../../model/typeFloor.model";
import {TypeEquipmentModel} from "../../../model/typeEquipment.model";
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
  public floors: FloorModel[];
  public totalRec: number;
  public flag = false;
  public checkEdit = false;
  public checkAdd = false;
  public page = 1;
  public searchText;
  addFloorForm: FormGroup;
  public floorOfId;
  public id: number;
  public typeFloors: TypeFloorModel[];
  public buildings: BuildingModel[];

  constructor(
    public floorService: FloorService,
    public typeFloorService: TypeFloorService,
    public buildingService:BuildingService,
    public dialog: MatDialog,
    public routerService: Router,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.subscription = this.typeFloorService.findAll().subscribe((data: TypeFloorModel[]) => {
      this.typeFloors = data;
    });
    this.subscription = this.buildingService.findAll().subscribe((data: BuildingModel[]) => {
      this.buildings = data;
    });
    this.subscription = this.floorService.findAll().subscribe((data: FloorModel[]) => {
      this.floors = data;
      this.totalRec = this.floors.length;
    });
    this.addFloorForm = this.fb.group({
      nameFloor: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      codeFloor: ['',[Validators.required, Validators.pattern(/^MTL-\d{3}$/)]],
      area: [''],
      capacity: [''],
      statusFloor: ['',[Validators.required]],
      typeFloorId: ['',[Validators.required]],
      buildingId: ['',[Validators.required]],
      id: ['']
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  addNewFloor() {
    alert(this.addFloorForm.value);
    this.floorService.save(this.addFloorForm.value).subscribe(data => {
      this.redirectTo('floors');
      this.floorService.showNotification('', 'Thêm mới thành công, chúc mừng bạn');
    });
  }

  redirectTo(uri: string) {
    this.routerService.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.routerService.navigate([uri]));
  }

  checkAddNewFloor() {
    if (!this.checkAdd) {
      this.ngOnInit();
      this.checkAdd = true;
      this.checkEdit = false;
    }
  }

  checkEditFloor(id) {
    if (!this.checkEdit) {
      this.checkEdit = !this.checkEdit;
      this.checkAdd = false;
      this.flag = id;
      this.floorOfId = id;
      this.floorService.findOne(this.floorOfId).subscribe(data => {
        this.addFloorForm.patchValue(data);
      });
    }
  }

  editFloor() {
    this.floorService.update(this.addFloorForm.value, this.floorOfId).subscribe(data => {
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

}

