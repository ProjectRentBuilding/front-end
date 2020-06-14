import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {ContractModel} from "../../../model/contract";
import {ContractService} from "../../../service/contract.service";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {Customer} from "../../../model/customer.model";
import {CustomerService} from "../../../service/customer.service";
import {EmployeeService} from "../../../service/employee.service";
import {GroundService} from "../../../service/ground.service";
import {EmployeeModel} from "../../../model/employee";
import {GroundModel} from "../../../model/ground.model";

@Component({
  selector: 'app-contract-detail',
  templateUrl: './contract-detail.component.html',
  styleUrls: ['./contract-detail.component.css']
})
export class ContractDetailComponent implements OnInit {

  public subscription: Subscription;
  public contract = {} as ContractModel;
  public contractID: number;
  // public formDetailContract: FormGroup;
  public customer = {} as Customer;
  public employee = {} as EmployeeModel;
  public ground = {} as GroundModel;
  public statusContract = "";
  public currentDay = Date.now();

  constructor(
    public contractService: ContractService,
    public customerService: CustomerService,
    public employeeService: EmployeeService,
    public groundService: GroundService,
    public router: Router,
    public activateRouter: ActivatedRoute
  ) {
    this.contractID = this.activateRouter.snapshot.params.id;
  }

  ngOnInit() {
    this.contractService.findOne(this.contractID).subscribe(data => {
      this.contract = data;

      this.customerService.findOne(Number(this.contract.customerId)).subscribe(data1 => {
        this.customer = data1;
      });

      this.employeeService.findOne(Number(this.contract.employeeId)).subscribe(data2 => {
        this.employee = data2;
        // console.log(this.employee);
      });

      this.groundService.findOne(Number(this.contract.groundId)).subscribe(data3 => {
        this.ground = data3;
      });


      if (new Date(this.contract.endRentDay).getTime() > this.currentDay) {
        this.statusContract = "Còn hiệu lực";
      } else {
        this.statusContract = "Hết hiệu lực";
      }




    });

  }
  formatsDate: string[] = [
    'dd/MM/yyyy',
  ];

}
