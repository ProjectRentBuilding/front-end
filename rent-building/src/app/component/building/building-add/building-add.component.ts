import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {BuildingService} from '../../../service/building.service';
import {Router} from '@angular/router';
import {ImageModel} from '../../../model/image.model';
import {FloorService} from '../../../service/floor.service';
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
  logo;

  constructor(
    public dialogRef: MatDialogRef<BuildingAddComponent>,
    public buildingService: BuildingService,
    public imageService: ImageService,
    public routerService: Router,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.imageService.findAll().subscribe(data => this.images = data);
    this.addBuildingForm = this.fb.group({
      abbreviationName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      taxCode: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
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
    this.buildingService.save(this.addBuildingForm.value).subscribe(data => {
      // if (data && data.id) {
      this.routerService.navigate(['buildings']).then(r => this.afterOnAddBuilding());
      // }

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

  onSelectChange(value) {

    this.logo=value;

  }
}


