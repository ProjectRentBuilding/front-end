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
import {TypeEquipmentModel} from '../../../model/typeEquipment.model';


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
  public formEditCustomer: FormGroup;
  public count: number;
  startDate = new Date(1990, 0, 1);
  public size = 5;
  public customerPage: any;
  public totalPages = 1;
  public pages = [];
  pageClicked: number = 0;
  public searchText = '';
  // public page = 1;
  public search;
  public subscription: Subscription;
  public customers: Customer[] = [];
  public grounds: GroundModel[] = [];
  public contracts: ContractModel[] = [];
  message = '';
  totalRec: number;
  public customerOfId;
  public customer: FormArray;
  public getarray = 1;

  constructor(public customerService: CustomerService,
              public dialog: MatDialog,
              public formBuilder: FormBuilder,
              public router: Router,
              public activateRouter: ActivatedRoute,
              public groundService: GroundService,
              public contractService: ContractService
  ) {
    this.formAddNewCustomer = this.formBuilder.group({
      customer: this.formBuilder.array([this.createCustomer()])
    });
  }

  loadData(page) {
    this.customerService.getCustomerPage(page, this.size, this.searchText)
      .subscribe(
        data => {
          // console.log(this.size);
          this.pageClicked = page;
          this.customerPage = data;
          this.customers = this.customerPage.content;
          this.totalPages = this.customerPage.totalPages;
          this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
        }
      )
  }

  createCustomer(): FormGroup {
    return this.formBuilder.group({
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
  }

  ngOnInit() {
    this.formEditCustomer = this.createCustomer();
    // this.customerService.findAll().subscribe(data => {
    //   this.customers = data;
    //   // this.totalRec = this.customers.length;
    // });
    this.loadData(0);
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

  // addNewCustomer() {
  //   this.customerService.save(this.formAddNewCustomer.value).subscribe(data => {
  //     this.customerService.showNotification('', 'Thêm mới thành công, chúc mừng bạn');
  //     this.redirectTo('customers');
  //     // this.dialogRef.close();
  //   });
  // }

  addNewCustomer() {

    this.customer = this.formAddNewCustomer.get('customer') as FormArray;
    console.log((this.customer.at(0).value));
    for (let tem = 0; tem < this.getarray; tem++) {
      // @ts-ignore
      this.customerService.save(this.customer.at(tem).value).subscribe(data => {
      });
    }
    this.customerService.showNotification('', 'Thêm mới thành công, chúc mừng bạn');
    this.redirectTo('customers');
    console.log(this.formAddNewCustomer);
    // this.ngOnInit();
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
        this.formEditCustomer.patchValue(data);
      });
    }
  }

  // checkAddCustomer() {
  //   if (!this.checkAdd) {
  //     this.checkAdd = !this.checkAdd;
  //     this.ngOnInit();
  //     this.checkEdit = false;
  //   }
  // }

  editCustomer() {
    console.log(this.formEditCustomer.value);
    this.customerService.update(this.formEditCustomer.value, this.customerOfId).subscribe(data => {
      this.redirectTo('customers/paging');
      this.customerService.showNotification('', 'Chỉnh sửa thành công  !!!');
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

  deleteAll() {
    console.log(this.customers.length);
    // tslint:disable-next-line:prefer-for-of
    for (let item = 0; item < this.customers.length; item++) {
      this.customerService.delete(this.customers[item].id).subscribe(data => {
      });
      this.redirectTo('customers');
    }
    this.customerService.showNotification('', 'Xoá thành công, chúc mừng bạn !!!');
  }

  logValue() {
    console.log(this.formAddNewCustomer.value);

  }

  get customerControls() {
    return this.formAddNewCustomer.get('customer')['controls'];
  }

  addNewArray(): void {
    this.checkAdd = true;
    this.getarray++;
    this.customer = this.formAddNewCustomer.get('customer') as FormArray;
    this.customer.push(this.createCustomer());
  }

  removeAddress(i: number) {
    this.customer.removeAt(i);
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
}
