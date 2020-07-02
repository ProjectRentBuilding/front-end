import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ServicesService} from '../../../service/services.service';
import {Router} from '@angular/router';
import {ServicesModel} from '../../../model/services.model';

@Component({
  selector: 'app-services-payment',
  templateUrl: './services-payment.component.html',
  styleUrls: ['./services-payment.component.css']
})
export class ServicesPaymentComponent implements OnInit {
  public servicePay: ServicesModel [] = [];
  public tempMonthYear: String;
  public tempNameService: String;
  public servicesModel: ServicesModel [] = [];
  public idService: number;
  public nameCustomer: String;
  public idCustomer: number;
  constructor(
    public dialogRef: MatDialogRef<ServicesPaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private servicesService: ServicesService,
    public router: Router
  ) { }

  ngOnInit() {
    this.servicesService.findAll().subscribe((data: ServicesModel[]) => {
      this.servicesModel = data;
    });
    this.servicePay = this.data.data1
    // @ts-ignore
    this.idService = this.servicePay.id;
    this.idCustomer = this.data.data2.id;
    this.nameCustomer = this.data.data2.name;
    // @ts-ignore
    this.tempMonthYear = this.servicePay.monthYear;
    // @ts-ignore
    this.tempNameService  = this.servicePay.nameService;
    // @ts-ignore
    this.servicePay.statusPay = 1;
  }

  formatsDate: string[] = [
    'dd/MM/yyyy',
  ];
  payment() {
    // @ts-ignore
    this.servicesService.update(this.servicePay, this.servicePay.id).subscribe(data => {
      this.afterDeleteService();
    });
  }
  afterDeleteService() {
    this.dialogRef.close();
    this.redirectTo('services-customer'+'/'+this.idCustomer);
    this.servicesService.showNotification('', 'Thanh toán thành công dịch vụ '+ this.tempNameService.toUpperCase() + ' , ngày '+ this.tempMonthYear);
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }
}
