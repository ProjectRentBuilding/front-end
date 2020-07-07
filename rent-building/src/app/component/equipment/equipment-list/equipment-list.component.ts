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
  public searchForm: FormGroup;
  public subscription: Subscription;
  public messageValidate: string;
  public equipmentOfId;
  public flag = -1;
  public flagAmount = 0;
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
  public pageClicked = 0;
  public searchText = '';
  public nameEquipmentSearch = '';
  public codeGroundSearch = '';
  public typeEquipmentSearch = '';
  // public codeGroundSearch : number;
  // public typeEquipmentIdSearch : number;
  public amountSearch = 0;
  public checkEdit = false;
  public checkAdd = false;
  public searchAll;
  public equipment: FormArray;
  public getArray = 1;

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
    this.groundService.findAll().subscribe((data: GroundModel[]) => {
      this.grounds = data;
    });
    this.typeElementService.findAll().subscribe((data: TypeEquipmentModel[]) => {
      this.typeEquipment = data;
    });
    this.formEditEquipment = this.createEquipment();
    this.searchForm = this.formBuilder.group({
      searchNameEquipment: [''],
      searchAmount: [''],
      searchCodeGround: [''],
      searchTypeEquipment: ['']
    });
    this.loadData(0);
  }

  loadData(page) {
    // @ts-ignore
    this.equipmentService.getEquipmentPageSearch(page, this.size, this.nameEquipmentSearch, this.amountSearch, this.codeGroundSearch, this.typeEquipmentSearch)
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
    if (this.pageClicked === this.totalPages - 1) {
    } else {
      this.pageClicked++;
    }
    this.loadData(this.pageClicked);
  }

  onPrevious() {
    if (this.pageClicked === 0) {
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
      amountOfBroken: [''],
      note: [''],
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
      this.getArray++;
      this.subscription = this.typeElementService.findAll().subscribe((data: TypeEquipmentModel[]) => {
        this.typeEquipment = data;
      });
      this.equipment = this.formAddNewEquipment.get('equipment') as FormArray;
      this.equipment.push(this.createEquipment());
    }
  }

  removeAddress(i: number) {
    if (this.getArray == 1) {
      this.checkAdd = false;
      this.formAddNewEquipment = this.formBuilder.group({
        equipment: this.formBuilder.array([this.createEquipment()])
      });
    } else {
      this.equipment.removeAt(i);
    }
  }

  addNewEquipment() {
    this.equipment = this.formAddNewEquipment.get('equipment') as FormArray;
    for (let tem = 0; tem < this.getArray; tem++) {
      this.equipmentModel.push(this.equipment.at(tem).value);
      this.equipmentService.save(this.equipment.at(tem).value).subscribe(data => {
        this.equipmentService.showNotification('', 'Thêm mới thành công, chúc mừng bạn');
        if (tem === (this.getArray - 1)) {
          this.equipment.reset();
          this.checkAdd = false;
          this.onLast();
          // this.loadData(this.checkPage + 1);
        }
      });
    }
    // console.log(this.formAddNewEquipment);
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }

  // checkEditEquipment(id) {
  //   if (!this.checkEdit) {
  //     this.checkEdit = !this.checkEdit;
  //     this.flag = id;
  //     this.equipmentOfId = id;
  //     this.equipmentService.findOne(this.equipmentOfId).subscribe(data => {
  //       this.formEditEquipment.patchValue(data);
  //     });
  //   }
  // }
  checkEditEquipment(id) {
    if (!this.checkEdit) {
      this.checkEdit = !this.checkEdit;
      this.flag = id;
      this.equipmentOfId = id;
      this.equipmentService.findOne(this.equipmentOfId).subscribe(data => {
        this.formEditEquipment.patchValue(data);
      });
    }
    if (this.flag>0) {
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
    this.checkAmount(this.formEditEquipment.value.amount, this.formEditEquipment.value.amountOfBroken);
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
        this.loadData(this.checkPage);
      });
    });
  }

  openDialogAddNew(): void {
    const dialogRef = this.dialog.open(EquipmentAddComponent, {
      width: '500px',
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadData(this.checkPage);
    });
  }

  searchType(event) {
    console.log(event);
    this.searchAll = event;
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

  // deleteAll() {
  //   for (let item = 0; item < this.equipmentModel.length; item++) {
  //     this.equipmentService.delete(this.equipmentModel[item].id).subscribe(data => {
  //     });
  //   }
  //   this.loadData(this.checkPage);
  //   this.equipmentService.showNotification('', 'Xoá tất cả thành công, chúc mừng bạn');
  // }

  onSearch(page) {
    if (this.searchForm.value.searchNameEquipment == null) {
      this.searchForm.value.searchNameEquipment = '';
      this.nameEquipmentSearch = this.searchForm.value.searchNameEquipment;
    }else {
      this.nameEquipmentSearch = this.searchForm.value.searchNameEquipment;
    }
    if(this.searchForm.value.searchAmount === '' || this.searchForm.value.searchAmount == null ){
      this.searchForm.value.searchAmount = 0;
      this.amountSearch = this.searchForm.value.searchAmount;
    } else {
      this.amountSearch = this.searchForm.value.searchAmount;
    }
    if (this.searchForm.value.searchCodeGround == null) {
      this.searchForm.value.searchCodeGround = '';
      this.codeGroundSearch = this.searchForm.value.searchCodeGround;
    } else {
      this.codeGroundSearch = this.searchForm.value.searchCodeGround;
    }
    if (this.searchForm.value.searchTypeEquipment == null) {
      this.searchForm.value.searchTypeEquipment = '';
      this.typeEquipmentSearch = this.searchForm.value.searchTypeEquipment;
    }else {
      this.typeEquipmentSearch = this.searchForm.value.searchTypeEquipment;
    }
    console.log(this.searchForm.value);
    this.loadData(page);
  }

  resetForm() {
    this.searchForm.reset();
    this.onSearch(0);
  }
  // search() {
  //   // @ts-ignore
  //   this.searchInterge = parseInt(document.getElementById('searchEquipment').value);
  //   // @ts-ignore
  //   this.searchText = document.getElementById('searchEquipment').value;
  // }
}
