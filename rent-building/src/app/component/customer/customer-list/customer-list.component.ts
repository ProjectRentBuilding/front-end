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
import {CustomerAddComponent} from '../customer-add/customer-add.component';
import {CustomerDetailGroundComponent} from '../customer-detail-ground/customer-detail-ground.component';


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
  pageClicked = 0;
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
  public checkPage = 0;
  // Hung them
  public navigational: string;
  public searchForm: FormGroup;
  public nameSearch: string;
  public idCardSearch: string;
  // @ts-ignore
  public dataCustomer: Customer = [];

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
      );
  }

  createCustomer(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.pattern('^[a-zA-ZÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶÉÈẺẼẸÊẾỀỂỄỆIÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰYÝỲỶỸỴĐáàảãạâấầẩẫậăắằẳẵặéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợuúùủũụưứừửữựýỳỷỹỵđ ]{1,40}$'), Validators.minLength(4), Validators.maxLength(30)]],
      idCard: ['', [Validators.required, Validators.pattern('^[0-9]{9,10}$')]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0][1-9]{9}$')]],
      birthday: ['', Validators.required],
      address: ['', Validators.required],
      website: ['', Validators.required],
      nameCompany: ['', Validators.required],
      nameGround: [''],
      rentStatus: ['']
    });
  }

  ngOnInit() {
    this.formEditCustomer = this.createCustomer();
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
    this.searchForm = this.formBuilder.group({
      searchName: ['', [Validators.pattern('^[a-zA-ZÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶÉÈẺẼẸÊẾỀỂỄỆIÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰYÝỲỶỸỴĐáàảãạâấầẩẫậăắằẳẵặéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợuúùủũụưứừửữựýỳỷỹỵđ ]{1,50}$'), Validators.maxLength(50)]],
      searchIdCard: ['', [Validators.pattern('[0-9]{1,11}'), Validators.max(10000000000)]],
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
        // this.ngOnInit();

      });
    });

  }

  openDialogAdd(): void {
    const dialogRef = this.dialog.open(CustomerAddComponent, {
      width: '40%',
      height: '80%',
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  openDialogDetailGround(customerId): void {
    this.customerService.findOne(customerId).subscribe(dataOfCustomer => {
      const dialogRef = this.dialog.open(CustomerDetailGroundComponent, {
        width: '500px',
        height: '250px',
        data: {data1: dataOfCustomer},
        disableClose: false,
      });
      dialogRef.afterClosed().subscribe(result => {
        // this.ngOnInit();
        this.loadData(this.checkPage);
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
    for (let tem = 0; tem < this.getarray; tem++) {
      this.customers.push(this.customer.at(tem).value);
      this.customerService.save(this.customer.at(tem).value).subscribe(data => {
        if (tem === (this.getarray - 1)) {
          this.customer.reset();
          this.onLast();
        }
      });
    }

    // this.redirectTo('customers');
    console.log(this.formAddNewCustomer);
    // this.ngOnInit();
    this.customerService.showNotification('', 'Thêm mới thành công, chúc mừng bạn');
    this.checkAdd = false;
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
      this.checkEdit = false;
      this.flag = null;
      // this.customerService.findAll().subscribe(data => {
      //   this.customers = data;
      //   // this.totalRec = this.customers.l      ength;
      // });
      this.loadData(this.checkPage);
      this.customerService.showNotification('', 'Chỉnh sửa thành công  !!!');
    });
  }

  checkPages(page) {
    this.checkPage = page;
  }

  resetCustomer() {
    console.log(this.customerOfId);
    this.customerService.findOne(this.customerOfId).subscribe(data => {
      this.formEditCustomer.patchValue(data);
    });
    console.log(this.formAddNewCustomer.value);
  }

  cancelAdd() {
    this.redirectTo('customers');
  }

//   deleteAll() {
//     for(let item=0;item <this.grounds.length;item++)
//       this.groundService.delete(this.grounds[item].id).subscribe(data => {
//       });
//     this.redirectTo('grounds');
//     this.groundService.showNotification('', 'Xoá tất cả thành công, chúc mừng bạn');
//   }
// }
  deleteAll() {
    // tslint:disable-next-line:prefer-for-of
    this.customerService.findAll().subscribe(data1 => {
      this.customers = data1;
      console.log(this.customers);
      for (let item = 0; item < this.customers.length; item++) {
        this.customerService.delete(this.customers[item].id).subscribe(data => {
        });
        this.redirectTo('customers');
      }
      this.customerService.showNotification('', 'Xoá thành công, chúc mừng bạn !!!');
      // this.totalRec = this.customers.length;
    });
  }

  logValue() {
    console.log(this.formAddNewCustomer.value);

  }

  get customerControls() {
    return this.formAddNewCustomer.get('customer')['controls'];
  }

  addNewArray(): void {
    if (!this.checkAdd) {
      this.checkAdd = !this.checkAdd;
    } else {
      this.getarray++;
      this.customer = this.formAddNewCustomer.get('customer') as FormArray;
      this.customer.push(this.createCustomer());
    }
  }

  // addNewArray(): void {
  //   if (!this.checkAdd) {
  //     this.checkAdd = !this.checkAdd;
  //   } else {
  //     this.getarray++;
  //     this.subscription = this.typeElementService.findAll().subscribe((data: TypeEquipmentModel[]) => {
  //       this.typeEquipment = data;
  //     });
  //     this.equipment = this.formAddNewEquipment.get('equipment') as FormArray;
  //     this.equipment.push(this.createEquipment());
  //   }
  // }

  removeAddress(i: number) {
    if (i === 0) {
      this.checkAdd = false;
    }
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

  // Hung them
  loadDataSearch(page) {
    this.customerService.getCustomersPage(page, this.size, this.nameSearch, this.idCardSearch)
      .subscribe(
        data => {
          this.pageClicked = page;
          this.customerPage = data;
          this.customers = this.customerPage.content;
          this.totalPages = this.customerPage.totalPages;
          this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
        }
      );
  }
  onSearch(number: number) {
    if (this.searchForm.value.searchName == null) {
      this.searchForm.value.searchName = '';
      this.nameSearch = this.searchForm.value.searchName;
    } else {
      this.nameSearch = this.searchForm.value.searchName;
    }

    if (this.searchForm.value.searchIdCard == null) {
      this.searchForm.value.searchIdCard = '';
      this.idCardSearch = this.searchForm.value.searchIdCard;
    } else {
      this.idCardSearch = this.searchForm.value.searchIdCard;
    }

    this.loadDataSearch(number);
  }
  resetForm() {
    this.searchForm.reset();
    this.onSearch(0);
  }

  openServicesCustomer(id: number) {
    this.customerService.findOne(id).subscribe(data => {
      this.dataCustomer = data;
      if (this.dataCustomer.contracts.length == 0) {
        this.customerService.showNotification('', 'Khách hàng không có dịch vụ để xem !!!');
      }else {
        this.router.navigate(['services-customer', id]);
      }
    });
  }
}
