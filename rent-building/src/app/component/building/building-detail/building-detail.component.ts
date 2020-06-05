import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BuildingService} from '../../../service/building.service';

@Component({
  selector: 'app-building-detail',
  templateUrl: './building-detail.component.html',
  styleUrls: ['./building-detail.component.css']
})
export class BuildingDetailComponent implements OnInit, OnDestroy {

  public subscription: Subscription;
  viewBuildingForm: FormGroup;
  public id: number;
  constructor(
    public dialogRef: MatDialogRef<BuildingDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public buildingService: BuildingService,
    public routerService: Router,
    private fb: FormBuilder,
  ) {
  }
  ngOnInit() {
    this.viewBuildingForm = this.fb.group({
      abbreviationName: [''],
      fullName: [''],
      taxCode: [''],
      phone: [''],
      email: [''],
      fax: [''],
      address: [''],
      management: [''],
      manager: [''],
      accountNumber: [''],
      recipientName: [''],
      bank: [''],
      logo: ['']
    });
    this.loadData();
  }
  loadData() {
    this.id = this.data.data1.id;
    this.viewBuildingForm.patchValue(this.data.data1);
  }
  onViewBuilding() {
    this.subscription = this.buildingService.update(this.viewBuildingForm.value, this.id).subscribe(data => {
      this.routerService.navigate(['buildings']).then(r => this.dialogRef.close());
    });
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

