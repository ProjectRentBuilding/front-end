import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ContractService} from "../../../service/contract.service";

@Component({
  selector: 'app-contract-delete',
  templateUrl: './contract-delete.component.html',
  styleUrls: ['./contract-delete.component.css']
})
export class ContractDeleteComponent implements OnInit {

  public customerName;
  public contractId;
  public endDayCheck: Date;
  public currentDay = Date.now();

  constructor(
    public dialogRef: MatDialogRef<ContractDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public contractService: ContractService,
  ) {

  }

  ngOnInit() {
    this.customerName = this.data.data1.customer.name;
    this.contractId = this.data.data1.id;
    this.endDayCheck = this.data.data1.endRentDay;
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

}
