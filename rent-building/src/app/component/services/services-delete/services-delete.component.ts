import {Component, Inject, OnInit} from '@angular/core';
import {ContractModel} from "../../../model/contract";
import {Subscription} from "rxjs";
import {ServicesModel} from "../../../model/services.model";
import {GroundService} from "../../../service/ground.service";
import {ContractService} from "../../../service/contract.service";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {ServicesService} from "../../../service/services.service";

@Component({
  selector: 'app-services-delete',
  templateUrl: './services-delete.component.html',
  styleUrls: ['./services-delete.component.css']
})
export class ServicesDeleteComponent implements OnInit {
  public subscription: Subscription;
  public nameService;
  public serviceId;
  constructor(
    public dialogRef: MatDialogRef<ServicesDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public servicesService: ServicesService,
  ) { }

  ngOnInit() {
    this.nameService = this.data.data1.nameService;
    this.serviceId= this.data.data1.id;
  }
  deleteService() {
    this.servicesService.delete(this.serviceId).subscribe(data => {
      this.afterDeleteService();
    });
  }
  afterDeleteService() {
    this.dialogRef.close();
    this.servicesService.showNotification('', 'Xóa thành công, chúc mừng bạn');
  }
}
