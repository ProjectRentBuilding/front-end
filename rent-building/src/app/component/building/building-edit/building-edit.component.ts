import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {BuildingService} from '../../../service/building.service';
import {Router} from '@angular/router';
import {ImageModel} from '../../../model/image.model';
import {ImageService} from '../../../service/image.service';

@Component({
  selector: 'app-building-edit',
  templateUrl: './building-edit.component.html',
  styleUrls: ['./building-edit.component.css']
})
export class BuildingEditComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  editBuildingForm: FormGroup;
  private images: ImageModel[];
  private id: number;
  urlImage: string;
  image;
  private check=true;
  private check1=false;
  private check2=false;
  private check3=true;
  idImage: string ;
  public idImagePick;



  constructor(
    public dialogRef: MatDialogRef<BuildingEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public buildingService: BuildingService,
    public imageService: ImageService,
    public routerService: Router,
    private fb: FormBuilder,


  ) {
  }

  ngOnInit() {

    this.imageService.findAll().subscribe(data => this.images = data);
    this.editBuildingForm = this.fb.group({
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
      logo: [''],
      id: ['']
    });
    this.loadData();
  }

  loadData() {
    this.id = this.data.data1.id;
    this.editBuildingForm.patchValue(this.data.data1);
    this.idImage=this.editBuildingForm.value.logo;
    if (this.idImage == null) {
      this.check3=false;
    }

  }

  onEditBuilding() {
    this.editBuildingForm.value.logo = this.idImagePick;
    this.subscription = this.buildingService.update(this.editBuildingForm.value, this.id).subscribe(data => {
      this.routerService.navigate(['buildings']).then(r => this.afterOnEditBuilding());
    });
  }

  afterOnEditBuilding() {
    this.dialogRef.close();
    this.buildingService.showNotification('', 'Sửa thành công, chúc mừng bạn');
  }

  clearFilters() {

    this.ngOnInit();
    this.check1 = false;
    this.check2 = false;


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
    this.check3=true;

  }


  cancelSelectImage() {
    this.check1=true;
    this.check2=false;
    this.check=true;
    this.check3=false;
    this.idImagePick=null;

  }
}

