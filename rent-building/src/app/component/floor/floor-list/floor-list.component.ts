import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {FloorModel} from '../../../model/floor.model';
import {FloorService} from '../../../service/floor.service';
import {MatDialog} from '@angular/material';

import {FloorDeleteComponent} from '../floor-delete/floor-delete.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Router} from '@angular/router';


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

  constructor(
    public floorService: FloorService,
    public dialog: MatDialog,
    public routerService: Router,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.subscription = this.floorService.findAll().subscribe((data: FloorModel[]) => {
      this.floors = data;
      this.totalRec = this.floors.length;
    });
    this.addFloorForm = this.fb.group({
      nameFloor: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
    });
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  addNewFloor() {
    this.floorService.save(this.addFloorForm.value).subscribe(data => {
      this.redirectTo('floors');
      this.floorService.showNotification('', 'Thêm mới thành công, chúc mừng bạn');
    });
  }
  redirectTo(uri:string) {
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

