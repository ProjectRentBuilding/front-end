import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {EquipmentService} from '../../../service/equipment.service';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {EquipmentModel} from '../../../model/equipment.model';
import {EquipmentDeleteComponent} from '../equipment-delete/equipment-delete.component';
import {GroundModel} from '../../../model/ground.model';
import {GroundService} from '../../../service/ground.service';

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
  public grounds: GroundModel[] = [];
  public totalRec: number;
  public page = 1;
  public checkEdit = false;
  public checkAdd = false;
  public searchText;

  constructor(
    public formBuilder: FormBuilder,
    public equipmentService: EquipmentService,
    public groundService: GroundService,
    public dialog: MatDialog,
    public router: Router
  ) {
  }

  ngOnInit() {
    this.subscription = this.groundService.findAll().subscribe((data: GroundModel[]) => {
      this.grounds = data;
    });
    this.subscription = this.equipmentService.findAll().subscribe((data: EquipmentModel[]) => {
      this.equipmentModel = data;
    });
    this.formAddNewEquipment = this.formBuilder.group({
      typeEquipment: ['', [Validators.required]],
      nameEquipment: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.pattern('^[0-9]{1,4}$')]],
      statusEquipment: ['', [Validators.required, Validators.pattern('^(Mới|Hỏng)$')]],
      amountOfBroken: ['', [Validators.required]],
      note: ['', [Validators.required]],
      ground: ['', [Validators.required]],
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
    this.equipmentService.save(this.formAddNewEquipment.value).subscribe(data => {
      this.checkAdd = false;
      this.redirectTo('equipments');
      this.equipmentService.showNotification('', 'Thêm mới thành công, chúc mừng bạn');
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
      this.equipmentService.findOne(this.equipmentOfId).subscribe(data => {
        this.formAddNewEquipment.patchValue(data);
      });
    }
  }

  editEquipment() {
    this.equipmentService.update(this.formAddNewEquipment.value, this.equipmentOfId).subscribe(data => {
      this.redirectTo('equipments');
      this.equipmentService.showNotification('', 'Sửa thành công, chúc mừng bạn');
    });
  }

  close() {
    this.redirectTo('equipments');
  }

  openDialogDelete(id): void {
    this.equipmentService.findOne(id).subscribe(dataOfEquipment => {
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
  searchType(text) {
    console.log(text);
    this.searchText = document.getElementById(text).innerText;
  }
}
