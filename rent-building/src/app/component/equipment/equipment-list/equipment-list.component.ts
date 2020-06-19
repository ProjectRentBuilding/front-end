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
import {EquipmentAddComponent} from '../equipment-add/equipment-add.component';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.css']
})
export class EquipmentListComponent implements OnInit, OnDestroy {
  public formAddNewEquipment: FormGroup;
  public formEditEquipment: FormGroup;
  public subscription: Subscription;
  public messageValidate: string;
  public equipmentOfId;
  public flag = -1;
  public equipmentModel: EquipmentModel[] = [];
  public grounds: GroundModel[] = [];
  public typeEquipment: TypeEquipmentModel[] = [];
  public checkPage = 0;
  public amountCheck: number;
  public amountOfBrokenCheck: number;
  public page = 1;
  public equipmentPage: any;
  public totalPages = 1;
  public pages = [];
  public size = 5;
  pageClicked = 0;
  public searchText = '';
  public searchInterge: number;
  public checkEdit = false;
  public checkAdd = false;
  // public searchText;
  public equipment: FormArray;
  public getarray = 1;

  constructor(
    private formBuilder: FormBuilder,
    private equipmentService: EquipmentService,
    private groundService: GroundService,
    private typeElementService: TypeEquipmentService,
    private dialog: MatDialog,
    private router: Router
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
    this.formEditEquipment = this.createEquipment();
    this.loadData(0);
  }

  loadData(page) {
    this.equipmentService.getEquipmentPage(page, this.size, this.searchText)
      .subscribe(
        data => {
          this.pageClicked = page;
          this.equipmentPage = data;
          this.equipmentModel = this.equipmentPage.content;
          this.totalPages = this.equipmentPage.totalPages;
          this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
        }
      );
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

  refreshForm() {
    this.searchText = '';
  }

  createEquipment(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      typeEquipmentId: ['', [Validators.required]],
      nameEquipment: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.pattern('[0-9]*')]],
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

  get equipmentControls() {
    // const a = 'controls';
    return this.formAddNewEquipment.get('equipment')['controls'];

  }

  addNewArray(): void {
    if (!this.checkAdd) {
      this.checkAdd = !this.checkAdd;
    } else {
      this.getarray++;
      this.subscription = this.typeElementService.findAll().subscribe((data: TypeEquipmentModel[]) => {
        this.typeEquipment = data;
      });
      this.equipment = this.formAddNewEquipment.get('equipment') as FormArray;
      this.equipment.push(this.createEquipment());
    }
  }

  removeAddress(i: number) {
    this.equipment.removeAt(i);
  }


  addNewEquipment() {
    this.equipment = this.formAddNewEquipment.get('equipment') as FormArray;
    for (let tem = 0; tem < this.getarray; tem++) {
      this.equipmentModel.push(this.equipment.at(tem).value);
      this.equipmentService.save(this.equipment.at(tem).value).subscribe(data => {
        this.equipmentService.showNotification('', 'Thêm mới thành công, chúc mừng bạn');
        if (tem === (this.getarray - 1)) {
          this.equipment.reset();
          // this.onLast();
          this.loadData(this.checkPage + 1);
        }
      });
    }
    console.log(this.formAddNewEquipment);
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }

  checkEditEquipment(id) {
    if (!this.checkEdit) {
      this.checkEdit = !this.checkEdit;
      this.flag = id;
      this.equipmentOfId = id;
      this.equipmentService.findOne(this.equipmentOfId).subscribe(data => {
        this.formEditEquipment.patchValue(data);
      });
    }
  }

  checkPages(page) {
    console.log(page);
    this.checkPage = page;
  }

  editEquipment() {
    console.log(this.checkPage);
    this.equipmentService.update(this.formEditEquipment.value, this.equipmentOfId).subscribe(data => {
      this.equipmentService.showNotification('', 'Sửa thành công, chúc mừng bạn');
      this.flag = -1;
      this.checkEdit = false;
      this.loadData(this.checkPage);
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
        disableClose: false,
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.ngOnInit();
      });
    });
  }

  openDialogAddNew(): void {
    const dialogRef = this.dialog.open(EquipmentAddComponent, {
      width: '900px',
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  searchType(event) {
    console.log(event);
    this.searchText = event;
  }


  checkAmount(amount: number, amountOfBroken: number) {
    if (amount == null) {
      return 0;
    }
    if (amount < amountOfBroken) {
      this.messageValidate = 'Số lượng hỏng không thể lớn hơn số lượng';
    } else {
      this.messageValidate = null;
    }
  }

  deleteAll() {
    for (let item = 0; item < this.equipmentModel.length; item++) {
      this.equipmentService.delete(this.equipmentModel[item].id).subscribe(data => {
      });
    }
    this.loadData(this.checkPage);
    this.equipmentService.showNotification('', 'Xoá tất cả thành công, chúc mừng bạn');
  }

}
