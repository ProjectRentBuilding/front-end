import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ContractService} from '../../../service/contract.service';
import {GroundModel} from "../../../model/ground.model";
import {GroundService} from "../../../service/ground.service";
import {Observable, Subscription} from "rxjs";
import {Customer} from "../../../model/customer.model";
import {CustomerService} from "../../../service/customer.service";
import {EmployeeService} from "../../../service/employee.service";
import {EmployeeModel} from "../../../model/employee";
import {map, startWith} from "rxjs/operators";
import {CustomerAddComponent} from "../../customer/customer-add/customer-add.component";
import {MatDialog} from "@angular/material/dialog";
import {ContractListComponent} from '../contract-list/contract-list.component';
import {ImgurApiService} from "../../../service/imgur-api.service";

@Component({
  selector: 'app-contract-add',
  templateUrl: './contract-add.component.html',
  styleUrls: ['./contract-add.component.css']
})
export class ContractAddComponent implements OnInit {
  // public currentDayValue = new Date();
  public subscription: Subscription;
  public formAddNewContract: FormGroup;
  public startDayCheck: Date;
  public endDayCheck: Date;
  public currentDay = Date.now();
  public messageTimeValidate: string;
  public termCalculate: number;
  public totalCalculate: number;
  public priceCalculate: number;
  public statusCalculate: boolean;
  public grounds: GroundModel[] = [];
  public customers: Customer[] = [];
  public customerId: number;
  public groundId: number;
  public employees: EmployeeModel[] = [];
  public contractId: number;
  public search: string;
  private mapCustomer = new Map();
  private customerIdPicker: any;
  title = 'angular-material-autocomplete';
  public filterCustomer: Observable<Customer[]>;
  // public contractListComponent: ContractListComponent;

  myControl = new FormControl();
  options: string[] = [];


  // filteredOptions: Observable<string[]>;


  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public contractService: ContractService,
    public groundService: GroundService,
    public customerService: CustomerService,
    public employeeService: EmployeeService,
    public dialog: MatDialog,
    public imgurApiService: ImgurApiService
  ) {


  }

  ngOnInit() {
    this.subscription = this.groundService.findAll().subscribe((data: GroundModel[]) => {
      this.grounds = data;
    });

    this.subscription = this.customerService.findAll().subscribe((data: Customer[]) => {
      this.customers = data;
      this.customers.forEach(element => {
        this.mapCustomer.set(element.id, element.name);
      })

    });

    this.subscription = this.employeeService.findAll().subscribe((data: EmployeeModel[]) => {
      this.employees = data;
    });


    this.formAddNewContract = this.formBuilder.group({
      id: [""],
      groundId: ['', [Validators.required]],
      customerId: ['', [Validators.required]],
      employeeId: ['', [Validators.required]],
      statusContract: [''],
      term: [''],
      startRentDay: ['', [Validators.required]],
      endRentDay: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      total: [''],
      deposits: [''],
      taxCode: ['', [Validators.required]],
      urlImage: [''],
      content: ['', [Validators.required]],
      unified: ['']
    });
    this.formAddNewContract.patchValue({
      unified: false
    });

    this.filterCustomer = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );


  }

  onChange(file) {
    this.imgurApiService.upload(file)
      .subscribe((data: any) => this.afterPickImage(data));

  }

  afterPickImage(data : any) {
    this.formAddNewContract.patchValue({
      urlImage: data.data.link
    });
  }

  addNewContract() {
    console.log(this.formAddNewContract.value);
    this.contractService.save(this.formAddNewContract.value).subscribe(data => {
      console.log(data);
      this.router.navigate(['contracts/paging']).then(r => this.afterAdd());
      console.log(this.formAddNewContract.value.urlImage + "  image")
    });

  }

  afterAdd() {
    window.sessionStorage.setItem("1", "1");
    this.contractService.showNotification('', 'Thêm mới thành công, chúc mừng bạn');
  }

  checkValidateTimeInput(a: Date, b: Date) {

    if (a == null || b == null) {
      return 0;
    }


    if (a.getTime() <= b.getTime()) {
      this.termCalculate = parseFloat(((b.getTime() - a.getTime()) / 2629800000).toFixed(2));
      this.totalCalculate = this.termCalculate * this.priceCalculate;
      this.messageTimeValidate = '';

      this.formAddNewContract.setErrors({ 'invalid': true });

    } else {
      this.messageTimeValidate = 'Ngày bắt đầu phải nhỏ hơn ngày kết thúc';
      this.formAddNewContract.setErrors({ 'invalid': false });

    }

    this.statusCalculate = (a.getTime() <= this.currentDay) && (b.getTime() >= this.currentDay);


  }


  private _filter(value: string): Customer[] {
    const filterValue = value.toLowerCase();

    return this.customers.filter(option => option.name.toLowerCase().includes(filterValue));
  }


  clearFilters() {
    this.ngOnInit();
  }

  formatsDate: string[] = [
    'dd/MM/yyyy',
  ];
  startDate = new Date(2020, 0, 1);

  pickId(key: number) {
    this.customerIdPicker = key;
  }

  openDialogAddNewCustomer() {
    const dialogRef = this.dialog.open(CustomerAddComponent, {
      width: '40%',
      height: '80%',
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.ngOnInit();
      this.router.navigateByUrl('/contracts/add').then();
    });
  }

}
