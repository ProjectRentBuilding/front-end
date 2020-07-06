import {Component, Inject, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {ServicesService} from "../../../service/services.service";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-services-delete',
  templateUrl: './services-delete.component.html',
  styleUrls: ['./services-delete.component.css']
})
export class ServicesDeleteComponent implements OnInit {
  public subscription: Subscription;
  public dateNow: Date = new Date();
  public nameService;
  public serviceId;
  checkMonthYear;
  currentYear;
  checkCurrentYear;
  statusService;
  constructor(
    public dialogRef: MatDialogRef<ServicesDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public servicesService: ServicesService,
  ) { }

  ngOnInit() {
    this.nameService = this.data.data1.nameService;
    this.serviceId= this.data.data1.id;
    this.checkMonthYear = this.data.data1.monthYear;
    this.currentYear=formatDate(this.dateNow, 'yyyy-MM-dd', 'en-US');
    this.checkCurrentYear=(parseInt(this.currentYear.slice(0,4))-3)+this.currentYear.slice(4);
    if (this.checkMonthYear < this.checkCurrentYear) {
      this.statusService = "Dịch vụ này đã hết hiệu lực, có thể xóa. Thao tác xóa không thể hoàn tác"
    } else {
      this.statusService = "Dịch vụ đang còn hiệu lực, không thể xóa"
    }
  }
  deleteService() {
    if (this.checkMonthYear < this.checkCurrentYear) {
      this.servicesService.delete(this.serviceId).subscribe(data => {
        this.dialogRef.close();
      });
      this.servicesService.showNotification('', 'Xóa thành công, chúc mừng bạn');
    } else {
      this.dialogRef.close();
      this.servicesService.showNotification("", "Không thể xóa dịch vụ trong vòng 3 năm");
    }
  }
  formatsDate: string[] = [
    'dd/MM/yyyy',
  ];
}
