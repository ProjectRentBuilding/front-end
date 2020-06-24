import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {Router} from "@angular/router";
import {ServicesService} from "../../../service/services.service";

@Component({
  selector: 'app-services-edit',
  templateUrl: './services-edit.component.html',
  styleUrls: ['./services-edit.component.css']
})
export class ServicesEditComponent implements OnInit {
  private subscription: Subscription;
  private editServiceForm: FormGroup;
  private id: number;

  constructor(
    public dialogRef: MatDialogRef<ServicesEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private servicesService: ServicesService,
    public routerService: Router
  ) { }

  ngOnInit() {
    this.editServiceForm = this.fb.group({
      nameService: ['', [Validators.required]],
      periodic: ['', [Validators.required]],
      unit: ['', [Validators.required]],
      price: ['', [Validators.required]],
    });
    this.loadData();
  }
  loadData() {
    this.id = this.data.data1.id;
    this.editServiceForm.patchValue(this.data.data1);
  }
  onEditService() {
    this.subscription = this.servicesService.update(this.editServiceForm.value, this.id).subscribe(data => {
      this.routerService.navigate(['services']).then(r => this.afterOnEditService());
    });
  }
  afterOnEditService() {
    this.dialogRef.close();
    this.servicesService.showNotification('', 'Sửa thành công, chúc mừng bạn');
  }

  clearFilters() {
    this.ngOnInit();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
