import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MatDialog} from '@angular/material';
import {BuildingService} from '../../../service/building.service';

import {Router} from '@angular/router';
import {ImageModel} from '../../../model/image.model';
import {ImageService} from '../../../service/image.service';

@Component({
  selector: 'app-building-add',
  templateUrl: './building-add.component.html',
  styleUrls: ['./building-add.component.css']
})
export class BuildingAddComponent implements OnInit, OnDestroy {

  public subscription: Subscription;
  addBuildingForm: FormGroup;
  public images: ImageModel[];
  urlImage: string;
  idImage: string ;
  public check=true;
  public check1=false;
  public check2=false;
  public idImagePick;


  constructor(
    public dialogRef: MatDialogRef<BuildingAddComponent>,
    public buildingService: BuildingService,
    public imageService: ImageService,
    public routerService: Router,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.imageService.findAll().subscribe(data => this.images = data);
    this.addBuildingForm = this.fb.group({
      abbreviationName: [''],
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      taxCode: ['',[Validators.required, Validators.pattern(/^MST-\d{3}$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{9}(\d{3})?$/)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(25)]],
      fax: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      address: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      management: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      manager: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      accountNumber: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      recipientName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      bank: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      logo: ['']
    });
  }
  onAddBuilding() {
    this.addBuildingForm.value.logo = this.idImagePick;


    this.buildingService.save(this.addBuildingForm.value).subscribe(data => {
      this.routerService.navigate(['buildings']).then(r => this.afterOnAddBuilding());


    });
  }
  afterOnAddBuilding(){
    this.dialogRef.close();
    this.buildingService.showNotification('', 'Thêm mới thành công, chúc mừng bạn');
  }
  clearFilters() {
    this.ngOnInit();
  }



  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  showPickImage() {
    this.check=false;
    this.check1=true;
    this.check2=true;
  }
  pickImage(src: any,idImage) {
    this.urlImage=src;
    this.idImage=idImage;
    this.check=true;
    this.idImagePick = idImage;

  }

  cancelSelectImage() {
    this.check1=false;
    this.check2=false;
    this.check=true;
    this.idImagePick=null;

  }

}


