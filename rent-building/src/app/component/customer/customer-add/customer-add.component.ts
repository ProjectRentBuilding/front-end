import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FloorModel} from '../../../model/floor.model';
import {Customer} from '../../../model/customer.model';
import {ContractModel} from '../../../model/contract';
import {GroundModel} from '../../../model/ground.model';
import {MatDialog, MatDialogRef} from '@angular/material';
import {BuildingService} from '../../../service/building.service';
import {ImageService} from '../../../service/image.service';
import {Router} from '@angular/router';
import {CustomerService} from '../../../service/customer.service';
import {GroundService} from '../../../service/ground.service';
import {ContractService} from '../../../service/contract.service';
import {ImageGalleryComponent} from '../../building/building-add/image-gallery/image-gallery.component';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit, OnDestroy {
  public subscription: Subscription;
  addCustomerForm: FormGroup;
  public customers: Customer[];
  public contracts: ContractModel[];
  public grounds: GroundModel[];
  startDate = new Date(1990, 0, 1);


  constructor(
    public dialogRef: MatDialogRef<CustomerAddComponent>,
    public customerService: CustomerService,
    public routerService: Router,
    private fb: FormBuilder,
    public dialog: MatDialog,
    public groundService: GroundService,
    public contractService: ContractService
  ) {
  }

  ngOnInit() {
    return this.addCustomerForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      idCard: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      birthday: ['', Validators.required],
      address: ['', Validators.required],
      website: ['', Validators.required],
      nameCompany: ['', Validators.required],
      nameGround: [''],
      rentStatus: ['']
    });
  }

  onAddBuilding() {
    this.customerService.save(this.addCustomerForm.value).subscribe(data => {
      // if (data && data.id) {
      this.routerService.navigate(['customers']).then(r => this.afterOnAddBuilding());
      // }

    });
  }

  afterOnAddBuilding() {
    this.dialogRef.close();
    this.customerService.showNotification('', 'Thêm mới thành công, chúc mừng bạn');
  }

  clearFilters() {
    this.ngOnInit();
  }


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSelectChange() {
    const dialogRef = this.dialog.open(ImageGalleryComponent, {
      width: '65%',
      height: '540px',
      disableClose: true,
    });
    // dialogRef.afterClosed().subscribe(result => {
    //   this.ngOnInit();
    // });
  }
}

