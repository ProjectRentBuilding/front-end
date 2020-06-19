import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ContractService} from "../../../service/contract.service";
import {GroundService} from "../../../service/ground.service";
import {CustomerService} from "../../../service/customer.service";
import {EmployeeService} from "../../../service/employee.service";
import {Subscription} from "rxjs";
import {GroundModel} from "../../../model/ground.model";
import {Customer} from "../../../model/customer.model";
import {EmployeeModel} from "../../../model/employee";

@Component({
  selector: 'app-contract-edit',
  templateUrl: './contract-edit.component.html',
  styleUrls: ['./contract-edit.component.css']
})
export class ContractEditComponent implements OnInit {

  public formEditContract: FormGroup;
  public currentDayValue = new Date();
  public subscription: Subscription;
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
  public urlImage: string;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public activatedRouter: ActivatedRoute,
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


    this.formEditContract = this.formBuilder.group({
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

    this.activatedRouter.params.subscribe(data => {
      this.contractId = data.id;
      this.contractService.findOne(this.contractId).subscribe(data1 => {
        this.formEditContract.patchValue(data1);
      }, () => {

      }, () => {
        this.urlImage = this.formEditContract.value.urlImage;
      });
    });
  }

  editContract() {
    console.log(this.formEditContract.value);
    console.log(this.contractId);
    this.contractService.update(this.formEditContract.value, this.contractId).subscribe(data => {
      this.router.navigateByUrl('contracts/paging').then(r => this.contractService.showNotification("", "Chỉnh sửa thành công, chúc mừng bạn"));
    });

  }

  checkValidateTimeInput(a: Date, b: Date) {
    let subA;
    let subB;
    subA = new Date(a);
    subB = new Date(b);

    if (subA.getTime() <= subB.getTime()) {
      this.termCalculate = parseFloat(((subB.getTime() - subA.getTime()) / 2629800000).toFixed(2));
      this.totalCalculate = this.termCalculate * this.priceCalculate;
      this.messageTimeValidate = "";
    } else {
      this.messageTimeValidate = "Ngày bắt đầu phải nhỏ hơn ngày kết thúc";
    }

    this.statusCalculate = (subA.getTime() <= this.currentDay) && (subB.getTime() >= this.currentDay);


  }

  startDate = new Date(2020, 0, 1);


  clearFilters() {
    this.ngOnInit();
  }


  checkDisable(startDayCheck: Date) {
    let a;
    a = new Date(startDayCheck);
    if (a.getTime() < this.currentDay) {
      return true;
    } else return false;

  }
}
