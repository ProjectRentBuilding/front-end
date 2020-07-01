import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ContractModel} from "../../../model/contract";
import {ContractService} from "../../../service/contract.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Customer} from "../../../model/customer.model";
import {CustomerService} from "../../../service/customer.service";
import {EmployeeService} from "../../../service/employee.service";
import {GroundService} from "../../../service/ground.service";
import {EmployeeModel} from "../../../model/employee";
import {GroundModel} from "../../../model/ground.model";
import {GroundDetailComponent} from "../../ground/ground-detail/ground-detail.component";
import {MatDialog} from "@angular/material/dialog";

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
    public activateRouter: ActivatedRoute,
    public dialog: MatDialog
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


  openDialogView(id): void {
    this.groundService.findOne(id).subscribe(dataOfGroundModel => {
      const dialogRef = this.dialog.open(GroundDetailComponent, {
        width: '65%',
        height: '540px',
        data: {data1: dataOfGroundModel},
        disableClose: false,
      });
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    });


  }

  goToLink() {
    window.open(this.contract.urlImage, "_blank");
  }
}
