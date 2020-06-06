import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {EquipmentService} from '../../../service/equipment.service';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {EquipmentModel} from '../../../model/equipment.model';
import {EquipmentDeleteComponent} from '../equipment-delete/equipment-delete.component';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.css']
})
export class EquipmentListComponent implements OnInit, OnDestroy {
  public formAddNewEquipment: FormGroup;
  public subscription: Subscription;
  public equipmentOfId;
  public flag;
  public equipmentModel: EquipmentModel[];

  public page = 1;
  public checkEdit = false;
  public checkAdd = false;
  public searchText;

  constructor(
    public formBuilder: FormBuilder,
    public equipmentService: EquipmentService,
    public dialog: MatDialog,
    public router: Router
  ) {
  }

  ngOnInit() {
    this.subscription = this.equipmentService.getAllEquipment().subscribe((data: EquipmentModel[]) => {
      this.equipmentModel = data;
    });
    this.formAddNewEquipment = this.formBuilder.group({
      type: ['', [Validators.required]],
      deviceName: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      status: ['', [Validators.required]],
      amountOfBroken: ['', [Validators.required]],
      note: ['', [Validators.required]],
      codeSpace: ['', [Validators.required]],
    });

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  checkaddNewEquipment() {
    if (!this.checkAdd) {
      this.ngOnInit();
      this.checkAdd = true;
      this.checkEdit = false;
    }
  }

  addNewEquipment() {
    this.equipmentService.addNewEquipment(this.formAddNewEquipment.value).subscribe(data => {
      this.checkAdd = false;
      this.redirectTo('equipment-list');
    });
    console.log(this.formAddNewEquipment);
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }

  checkEditEquipment(id) {
    if (!this.checkEdit) {
      this.checkEdit = !this.checkEdit;
      this.checkAdd = false;
      this.flag = id;
      this.equipmentOfId = id;
      this.equipmentService.getEquipmentById(this.equipmentOfId).subscribe(data => {
        this.formAddNewEquipment.patchValue(data);
      });
    }
  }

  editEquipment() {
    this.equipmentService.editEquipment(this.formAddNewEquipment.value, this.equipmentOfId).subscribe(data => {
      this.redirectTo('equipment-list');
    });
  }

  close() {
    this.redirectTo('equipment-list');
  }

  openDialogDelete(id): void {
    this.equipmentService.getEquipmentById(id).subscribe(dataOfEquipment => {
      const dialogRef = this.dialog.open(EquipmentDeleteComponent, {
        width: '500px',
        data: {data1: dataOfEquipment},
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.ngOnInit();
      });
    });
  }

}
