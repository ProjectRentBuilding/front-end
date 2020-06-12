import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {ContractModel} from "../../../model/contract";
import {ContractService} from "../../../service/contract.service";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {Customer} from "../../../model/customer.model";
import {CustomerService} from "../../../service/customer.service";
import {EmployeeService} from "../../../service/employee.service";
import {GroundService} from "../../../service/ground.service";

@Component({
  selector: 'app-contract-detail',
  templateUrl: './contract-detail.component.html',
  styleUrls: ['./contract-detail.component.css']
})
export class ContractDetailComponent implements OnInit {

  public subscription: Subscription;
  public contract: ContractModel;
  public contractID: number;
  public formDetailContract: FormGroup;
  public customer : any;
  public employee: any;
  public ground: any;

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
        console.log(this.employee);
      });

      this.groundService.findOne(Number(this.contract.groundId)).subscribe(data3 => {
        this.ground = data3;
      });





    });


  }
  formatsDate: string[] = [
    'dd/MM/yyyy',
  ];

}
