import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {EquipmentService} from '../../../service/equipment.service';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {EquipmentModel} from '../../../model/equipment.model';
import {EquipmentDeleteComponent} from '../equipment-delete/equipment-delete.component';
import {GroundModel} from '../../../model/ground.model';
import {GroundService} from '../../../service/ground.service';
import {TypeEquipmentService} from '../../../service/type-equipment.service';
import {TypeEquipmentModel} from '../../../model/typeEquipment.model';

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
  public typeEquipment: TypeEquipmentModel[];
  public totalRec: number;
  public page = 1;
  public checkEdit = false;
  public checkAdd = false;
  public searchText;
  public equipment: FormArray;
  public getarray = 1;
  constructor(
    public formBuilder: FormBuilder,
    public equipmentService: EquipmentService,
    public groundService: GroundService,
    public typeElementService: TypeEquipmentService,
    public dialog: MatDialog,
    public router: Router
  ) {
    this.formAddNewEquipment = this.formBuilder.group({
      equipment: this.formBuilder.array([this.createEquipment()])
    });
  }

  ngOnInit() {
    this.typeElementService.findAll().subscribe((data: TypeEquipmentModel[]) => {
      this.typeEquipment = data;
    });
    this.groundService.findAll().subscribe((data: GroundModel[]) => {
      this.grounds = data;
    });
    this.equipmentService.findAll().subscribe((data: EquipmentModel[]) => {
      this.equipmentModel = data;
    });
    // this.formAddNewEquipment = this.formBuilder.group({
    //   id:[''],
    //   typeEquipmentId: ['', [Validators.required]],
    //   nameEquipment: ['', [Validators.required]],
    //   amount: ['', [Validators.required, Validators.pattern('^[0-9]{1,4}$')]],
    //   amountOfBroken: ['', [Validators.required]],
    //   note: ['', [Validators.required]],
    //   groundId: ['', [Validators.required]],
    // });
  }

  createEquipment(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      typeEquipmentId: ['', [Validators.required]],
      // typeEquipmentId: [''],
      nameEquipment: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.pattern('^[0-9]{1,4}$')]],
      amountOfBroken: ['', [Validators.required]],
      note: ['', [Validators.required]],
      groundId: ['', [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  logValue() {
    console.log(this.formAddNewEquipment.value);

  }

  get equipmentControls() {
    return this.formAddNewEquipment.get('equipment')['controls'];
  }

  addNewArray(): void {
    this.checkAdd = true;
    this.getarray ++;
    this.subscription = this.typeElementService.findAll().subscribe((data: TypeEquipmentModel[]) => {
      this.typeEquipment = data;
    });
    this.equipment = this.formAddNewEquipment.get('equipment') as FormArray;
    this.equipment.push(this.createEquipment());
  }

  removeAddress(i: number) {
    this.equipment.removeAt(i);
  }

  // checkaddNewEquipment() {
  //   if (!this.checkAdd) {
  //     // this.ngOnInit();
  //     this.checkAdd = true;
  //     this.checkEdit = false;
  //   }
  // }
  // saveEquipment(model: any, isValid: boolean, e: any){
  //   e.preventDefault();
  //   alert('Form data are: ' + model.at(1));
  //
  // }

  addNewEquipment() {

    this.equipment = this.formAddNewEquipment.get('equipment') as FormArray;
    console.log((this.equipment.at(0).value));
    for(let tem =0; tem < this.getarray; tem++){
      // @ts-ignore
      this.equipmentService.save(this.equipment.at(tem).value).subscribe(data => {
        this.equipmentService.showNotification('', 'Thêm mới thành công, chúc mừng bạn');
      });
    }
    // // this.checkAdd = false;
    this.redirectTo('equipments');
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

  // openDialogDelete(id): void {
  //   this.equipmentService.findOne(id).subscribe(dataOfEquipment => {
  //     const dialogRef = this.dialog.open(EquipmentDeleteComponent, {
  //       width: '500px',
  //       data: {data1: dataOfEquipment},
  //       disableClose: true,
  //     });
  //     dialogRef.afterClosed().subscribe(result => {
  //       console.log('The dialog was closed');
  //       this.ngOnInit();
  //     });
  //   });
  // }
  // searchType(text) {
  //   console.log(text);
  //   this.searchText = document.getElementById(text).innerText;
  // }


}
