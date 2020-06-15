import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ContractService} from '../../../service/contract.service';
import {GroundModel} from "../../../model/ground.model";
import {GroundService} from "../../../service/ground.service";
import {Subscription} from "rxjs";
import {Customer} from "../../../model/customer.model";
import {CustomerService} from "../../../service/customer.service";
import {EmployeeService} from "../../../service/employee.service";
import {EmployeeModel} from "../../../model/employee";

@Component({
  selector: 'app-contract-add',
  templateUrl: './contract-add.component.html',
  styleUrls: ['./contract-add.component.css']
})
export class ContractAddComponent implements OnInit {
  public currentDayValue = new Date();
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
  public employees : EmployeeModel[] = [];
  public contractId: number;



  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public contractService: ContractService,
    public groundService: GroundService,
    public customerService: CustomerService,
    public employeeService: EmployeeService
  ) {

  }

  ngOnInit() {
    this.subscription = this.groundService.findAll().subscribe((data: GroundModel[]) => {
      this.grounds = data;
    });

    this.subscription = this.customerService.findAll().subscribe((data: Customer[]) => {
      this.customers = data;
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


  }

  addNewContract() {
    console.log(this.formAddNewContract.value);
    this.contractService.save(this.formAddNewContract.value).subscribe(data => {
      console.log(data);
      this.router.navigateByUrl('contracts').then(r => this.contractService.showNotification('', 'Thêm mới thành công, chúc mừng bạn'));




    });

  }

  checkValidateTimeInput(a: Date, b: Date) {

    if (a == null || b == null) {
      return 0;
    }


    if (a.getTime() <= b.getTime()) {
      this.termCalculate = parseFloat(((b.getTime() - a.getTime()) / 2629800000).toFixed(2));
      this.totalCalculate = this.termCalculate * this.priceCalculate;
      this.messageTimeValidate = '';
    } else {
      this.messageTimeValidate = 'Ngày bắt đầu phải nhỏ hơn ngày kết thúc';
    }

    this.statusCalculate = (a.getTime() <= this.currentDay) && (b.getTime() >= this.currentDay);


  }

  startDate = new Date(2020, 0, 1);


  clearFilters() {
    this.ngOnInit();
  }

  formatsDate: string[] = [
    'dd/MM/yyyy',
  ];
}
