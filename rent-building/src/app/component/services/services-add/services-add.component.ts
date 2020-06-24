import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ServicesService} from "../../../service/services.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-services-add',
  templateUrl: './services-add.component.html',
  styleUrls: ['./services-add.component.css']
})
export class ServicesAddComponent implements OnInit {
  private subscription: Subscription;
  private addServiceForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ServicesAddComponent>,
    private fb: FormBuilder,
    private servicesService: ServicesService,
    public routerService: Router
  ) { }

  ngOnInit() {
    this.addServiceForm = this.fb.group({
      nameService: ['', [Validators.required]],
      periodic: ['', [Validators.required]],
      unit: ['', [Validators.required]],
      price: ['', [Validators.required]],
    });
  }
  onAddService() {
    console.log(this.addServiceForm.value);
    this.servicesService.save(this.addServiceForm.value).subscribe(data => {
      // if (data && data.id) {
      this.routerService.navigate(['services']).then(r => this.afterOnAddService());
      // }
    });
  }
  afterOnAddService() {
    this.dialogRef.close();
    this.servicesService.showNotification('', 'Thêm mới thành công, chúc mừng bạn');

  }


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  clearFilters() {
    this.ngOnInit();
  }

}
