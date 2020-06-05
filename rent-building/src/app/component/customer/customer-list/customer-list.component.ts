import {Component, OnDestroy, OnInit} from '@angular/core';
import {Customer} from '../../../model/customer.model';
import {Subscription} from 'rxjs';
import {CustomerService} from '../../../service/customer.service';
import {MatDialog} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {CustomerDeleteComponent} from '../customer-delete/customer-delete.component';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit, OnDestroy {
  public checkEdit = false;
  public checkAdd = false;
  public formAddNewCustomer: FormGroup;
  public addCustomer: FormGroup;
  public count: number;
  startDate = new Date(1990, 0, 1);
  public page = 1;
  public search;
  public subscription: Subscription;
  public customers: Customer[] = [];
  message = '';
  totalRec: number;
  public flag;
  public customerOfId;

  constructor(public customerService: CustomerService, public dialog: MatDialog, public formBuilder: FormBuilder,
              public router: Router, public activateRouter: ActivatedRoute) {
  }

  ngOnInit() {
    this.formAddNewCustomer = this.formBuilder.group({
      name: ['', Validators.required],
      idCard: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      birthday: ['', Validators.required],
      address: ['', Validators.required],
      website: ['', Validators.required],
      nameCompany: ['', Validators.required],
      name1: ['', Validators.required],
      idCard1: ['', Validators.required],
      email1: ['', Validators.required],
      phone1: ['', Validators.required],
      birthday1: ['', Validators.required],
      address1: ['', Validators.required],
      website1: ['', Validators.required],
      nameCompany1: ['', Validators.required]
    });
    this.customerService.findAll().subscribe(data => {
      this.customers = data;
      this.totalRec = this.customers.length;
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

  // openDialogAdd(): void {
  //   const dialogRef = this.dialog.open(CustomerAddComponent, {
  //     width: '900px',
  //     height: '550px',
  //     disableClose: true
  //   });
  //
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     this.ngOnInit();
  //
  //   });
  // }
  addNewCustomer() {
    this.customerService.save(this.formAddNewCustomer.value).subscribe(data => {
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
}
