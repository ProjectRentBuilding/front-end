import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Customer} from '../../../model/customer.model';
import {ContractModel} from '../../../model/contract';
import {GroundModel} from '../../../model/ground.model';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {CustomerService} from '../../../service/customer.service';
import {Router} from '@angular/router';
import {GroundService} from '../../../service/ground.service';
import {ContractService} from '../../../service/contract.service';

@Component({
  selector: 'app-customer-detail-ground',
  templateUrl: './customer-detail-ground.component.html',
  styleUrls: ['./customer-detail-ground.component.css']
})
export class CustomerDetailGroundComponent implements OnInit, OnDestroy {
  public customerOfName;
  public customerOfId;
  public customerGrounds = new Array<string>();
  public customerStatusContract = new Array<string>();
  public subscription: Subscription;
  public customers: Customer[];
  public contracts: ContractModel[] = [];
  public grounds: GroundModel[];

  constructor(
    public dialogRef: MatDialogRef<CustomerDetailGroundComponent>,
    public customerService: CustomerService,
    public routerService: Router,
    public dialog: MatDialog,
    public groundService: GroundService,
    public contractService: ContractService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit() {
    // alert(this.data.data1.name.contracts.ground.codeGround);
    this.customerOfId = this.data.data1.id;
    this.customerOfName = this.data.data1.name;

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.data.data1.contracts.length; i++) {
      this.customerGrounds.push(this.data.data1.contracts[i].ground.codeGround);
      this.customerStatusContract.push(this.data.data1.contracts[i].statusContract);
      // console.log(this.customerGrounds);
    }

    // console.log(this.data.data1);
    console.log(this.data.data1.contracts);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
