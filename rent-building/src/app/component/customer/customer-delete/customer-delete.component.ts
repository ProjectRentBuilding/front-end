import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CustomerService} from '../../../service/customer.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-customer-delete',
  templateUrl: './customer-delete.component.html',
  styleUrls: ['./customer-delete.component.css']
})
export class CustomerDeleteComponent implements OnInit {
  public customerOfFullname;
  public customerOfId;

  constructor(
    public dialogRef: MatDialogRef<CustomerDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public customerService: CustomerService,
    public router: Router
  ) {
  }

  ngOnInit() {
    this.customerOfFullname = this.data.data1.name;
    this.customerOfId = this.data.data1.id;
    console.log(this.customerOfFullname);
  }

  deleteCustomer() {
    this.customerService.delete(this.customerOfId).subscribe(data => {
      this.dialogRef.close();
      this.redirectTo('customers/paging');
      this.customerService.showNotification('', 'Xóa thành công  !!!');
    });
  }
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }
}
