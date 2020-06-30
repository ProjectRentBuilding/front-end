import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ServicesService} from "../../../service/services.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import { MatDialogRef } from '@angular/material';
import {ContractService} from "../../../service/contract.service";
import {ContractModel} from "../../../model/contract";

@Component({
  selector: 'app-services-add',
  templateUrl: './services-add.component.html',
  styleUrls: ['./services-add.component.css']
})
export class ServicesAddComponent implements OnInit {
  private subscription: Subscription;
  private addServiceForm: FormGroup;
  private indexBeforeMonth=0;
  private consume=0;
  private indexAfterMonth=0;
  private contracts;
  startDate = new Date(2000, 1, 1);

  constructor(
    public dialogRef: MatDialogRef<ServicesAddComponent>,
    private fb: FormBuilder,
    private servicesService: ServicesService,
    private contractService:ContractService,
    public routerService: Router

  ) { }

  ngOnInit() {
    this.subscription = this.contractService.findAll().subscribe((data: ContractModel[]) => {
      this.contracts = data;
    });
    this.addServiceForm = this.fb.group({
      nameService: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      periodic: ['', [Validators.required]],
      unit: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      price: ['', [Validators.required]],
      indexBeforeMonth: ['', [Validators.required]],
      indexAfterMonth: ['', [Validators.required]],
      consume: ['', [Validators.required]],
      monthYear: ['', [Validators.required]],
      contractId: ['', [Validators.required]]
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

  checkIndexBeforeMonth(indexBeforeMonth) {
    this.indexBeforeMonth=parseInt(indexBeforeMonth);
    this.indexAfterMonth = this.addServiceForm.value.indexBeforeMonth + this.consume;
  }

  checkConsume(consume) {
    this.consume=parseInt(consume);
    this.indexAfterMonth=this.indexBeforeMonth + this.addServiceForm.value.consume;
  }
}
