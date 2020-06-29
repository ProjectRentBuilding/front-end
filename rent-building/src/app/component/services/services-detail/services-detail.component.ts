import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ImageService} from "../../../service/image.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-services-detail',
  templateUrl: './services-detail.component.html',
  styleUrls: ['./services-detail.component.css']
})
export class ServicesDetailComponent implements OnInit,OnDestroy {
  public subscription: Subscription;
  viewServiceForm: FormGroup;
  public id: number;
  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.viewServiceForm = this.fb.group({
      nameService: [''],
      indexBeforeMonth: [''],
      indexAfterMonth: [''],
      periodic: [''],
      unit: [''],
      consume: [''],
      price: [''],
      monthYear: [''],
      contract: ['']
    });
  }

  loadData() {
    // this.id = this.data.data1.id;
    // this.viewServiceForm.patchValue(this.data.data1);
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
