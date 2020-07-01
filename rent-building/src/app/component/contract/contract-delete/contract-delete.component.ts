import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ContractService} from "../../../service/contract.service";
import {CustomerService} from "../../../service/customer.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-contract-delete',
  templateUrl: './contract-delete.component.html',
  styleUrls: ['./contract-delete.component.css']
})
export class ContractDeleteComponent implements OnInit {

  // public customerName;
  public contractId;
  public endDayCheck: Date;
  public currentDay = Date.now();
  public customer: any;
  public contract: any;
  public subscription: Subscription;
  public statusContract: any;

  constructor(
    public dialogRef: MatDialogRef<ContractDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public contractService: ContractService,
    public customerService: CustomerService,
  ) {

  }

  ngOnInit() {
    this.contractId = this.data.data1.id;
    this.contractService.findOne(this.contractId).subscribe(data => {
      this.contract = data;
      this.customerService.findOne(Number(this.contract.customerId)).subscribe(data1 => {
        this.customer = data1;
        console.log(this.customer)
      });

    });
    this.endDayCheck = this.data.data1.endRentDay;


    let subTime;
    subTime = new Date(this.endDayCheck);

    if (subTime.getTime() < this.currentDay) {
      this.statusContract = "Hợp đồng này đã hết hiệu lực, có thể xóa. Thao tác xóa không thể hoàn tác"
    } else {
      this.statusContract = "Hợp đồng đang còn hiệu lực, không thể xóa"
    }
  }

  deleteContract() {
    let subTime;
    subTime = new Date(this.endDayCheck);

    if (subTime.getTime() < this.currentDay) {
      this.contractService.delete(this.contractId).subscribe(data => {
        this.dialogRef.close();
      });
      this.contractService.showNotification("", "Xóa thành công, chúc mừng bạn");
    } else {
      this.dialogRef.close();
      this.contractService.showNotification("", "Không thể xóa hợp đồng đang còn hiệu lực");
    }

  }

  formatsDate: string[] = [
    'dd/MM/yyyy',
  ];

}
