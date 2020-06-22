import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ImageModel} from "../../../model/image.model";
import {ImageService} from "../../../service/image.service";


@Component({
  selector: 'app-building-detail',
  templateUrl: './building-detail.component.html',
  styleUrls: ['./building-detail.component.css']
})
export class BuildingDetailComponent implements OnInit, OnDestroy {

  public subscription: Subscription;
  private images: ImageModel[];
  viewBuildingForm: FormGroup;
  public id: number;
  idImage: string ;
  check1;
  check2;
  constructor(
    public dialogRef: MatDialogRef<BuildingDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public imageService: ImageService,
    private fb: FormBuilder,
  ) {
  }
  ngOnInit() {
    this.imageService.findAll().subscribe(data => this.images = data);
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
    this.idImage=this.viewBuildingForm.value.logo;
    if (this.idImage == null) {
      this.check1=true;
      this.check2=false;
    }else{
      this.check2=true;
      this.check1=false;
    }

  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

