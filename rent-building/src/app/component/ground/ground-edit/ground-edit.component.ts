import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {GroundService} from '../../../service/ground.service';
import {Router} from '@angular/router';
import {FloorModel} from '../../../model/floor.model';
import {FloorService} from '../../../service/floor.service';
import {TypeGroundModel} from "../../../model/typeGround.model";
import {TypeGroundService} from "../../../service/type-ground.service";
import {BuildingService} from "../../../service/building.service";
import {BuildingModel} from "../../../model/building.model";

@Component({
  selector: 'app-ground-edit',
  templateUrl: './ground-edit.component.html',
  styleUrls: ['./ground-edit.component.css']
})
export class GroundEditComponent implements OnInit, OnDestroy {

  public subscription: Subscription;
  editGroundForm: FormGroup;
  public floors: FloorModel[];
  public typeGrounds: TypeGroundModel[];
  public buildings:BuildingModel[];

  public id: number;
  constructor(
    public dialogRef: MatDialogRef<GroundEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public groundService: GroundService,
    public floorService: FloorService,
    public typeGroundService: TypeGroundService,
    public buildingService : BuildingService,
    public routerService: Router,
    private fb: FormBuilder,
  ) {
  }
  ngOnInit() {
    this.floorService.findAll().subscribe(data => this.floors = data);
    this.typeGroundService.findAll().subscribe(data => this.typeGrounds = data);
    this.buildingService.findAll().subscribe(data => this.buildings = data);
    this.editGroundForm = this.fb.group({
      codeGround: ['', [Validators.required, Validators.pattern(/^MB\d{3}$/)]],
      typeGroundId: ['',[Validators.required]],
      buildingId: ['', [Validators.required]],
      note:[''],
      area: ['',[Validators.required, Validators.maxLength(15), Validators.pattern(/^([1-9]([0-9])?)|([0-9]([1-9])?)$/)]],
      floorId:['',[Validators.required]],
      statusGround:[''],
      price:[''],
      priceManager:[''],
      id: ['']
    });
    this.loadData();
  }
  loadData() {
    this.id = this.data.data1.id;
    this.editGroundForm.patchValue(this.data.data1);
  }
  onEditGround() {
    this.subscription = this.groundService.update(this.editGroundForm.value, this.id).subscribe(data => {
      this.routerService.navigate(['grounds']).then(r => this.afterOnEditGround());
    });
  }
  afterOnEditGround() {
    this.dialogRef.close();
    this.groundService.showNotification('', 'Sửa thành công, chúc mừng bạn');
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


