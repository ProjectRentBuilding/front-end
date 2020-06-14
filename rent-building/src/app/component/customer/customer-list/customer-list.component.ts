import {Component, OnDestroy, OnInit} from '@angular/core';
import {Customer} from '../../../model/customer.model';
import {Subscription} from 'rxjs';
import {CustomerService} from '../../../service/customer.service';
import {MatDialog} from '@angular/material';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {CustomerDeleteComponent} from '../customer-delete/customer-delete.component';
import {GroundService} from '../../../service/ground.service';
import {GroundModel} from '../../../model/ground.model';
import {ContractService} from '../../../service/contract.service';
import {ContractModel} from '../../../model/contract';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit, OnDestroy {
  public checkEdit = false;
  public checkAdd = false;
  public flag;
  public formAddNewCustomer: FormGroup;
  public count: number;
  startDate = new Date(1990, 0, 1);
  public page = 1;
  public search;
  public subscription: Subscription;
  public customers: Customer[] = [];
  public grounds: GroundModel[] = [];
  public contracts: ContractModel[] = [];
  message = '';
  public customerOfId;

  constructor(public customerService: CustomerService,
              public dialog: MatDialog,
              public formBuilder: FormBuilder,
              public router: Router,
              public activateRouter: ActivatedRoute,
              public groundService: GroundService,
              public contractService: ContractService
  ) {
  }
  ngOnInit() {
    this.formAddNewCustomer = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      idCard: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      birthday: ['', Validators.required],
      address: ['', Validators.required],
      website: ['', Validators.required],
      nameCompany: ['', Validators.required],
      nameGround: ['', Validators.required],
      rentStatus: ['']
    });
    this.customerService.findAll().subscribe(data => {
      this.customers = data;
      // this.totalRec = this.customers.length;
    });
    this.groundService.findAll().subscribe(data => {
      this.grounds = data;
      // this.totalRec = this.customers.length;
    });
    this.contractService.findAll().subscribe(data => {
      this.contracts = data;
      // this.totalRec = this.customers.length;
    });
    this.formAddNewCustomer.patchValue({
      // startRentDay: new Date().toJSON(),
      // endRentDay: new Date().toJSON(),
      rentStatus: false
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  openDialogDelete(customerId): void {
    this.customerService.findOne(customerId).subscribe(dataOfEmployee => {
      const dialogRef = this.dialog.open(CustomerDeleteComponent, {
        width: '500px',
        height: '250px',
        data: {data1: dataOfEmployee},
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.ngOnInit();

      });
    });

  }

  addNewCustomer() {
    this.customerService.save(this.formAddNewCustomer.value).subscribe(data => {
      this.customerService.showNotification('', 'Thêm mới thành công, chúc mừng bạn');
      this.redirectTo('customers');
      // this.dialogRef.close();
    });
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }

  checkEditCustomer(id) {
    if (!this.checkEdit) {
      this.checkEdit = !this.checkEdit;
      this.checkAdd = false;
      this.flag = id;
      this.customerOfId = id;
      this.customerService.findOne(this.customerOfId).subscribe(data => {
        this.formAddNewCustomer.patchValue(data);
      });
    }
  }

  checkAddCustomer() {
    if (!this.checkAdd) {
    this.checkAdd = !this.checkAdd;
    this.ngOnInit();
    this.checkEdit = false;
    }
  }

  editCustomer() {
    this.customerService.showNotification('', 'Chỉnh sửa thành công  !!!');
    this.customerService.update(this.formAddNewCustomer.value, this.customerOfId).subscribe(data => {
      this.redirectTo('customers');
    });
  }

  resetCustomer() {
    this.customerService.findOne(this.customerOfId).subscribe(data => {
      this.formAddNewCustomer.patchValue(data);
    });
    console.log(this.formAddNewCustomer.value);
  }

  cancelAdd() {
    this.redirectTo('customers');
  }

}
