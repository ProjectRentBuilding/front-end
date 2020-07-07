import {Component, Inject, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FloorService} from "../../../service/floor.service";
import {FloorModel} from "../../../model/floor.model";
import {ContractModel} from "../../../model/contract";
import {ContractService} from "../../../service/contract.service";
import {TypeGroundService} from "../../../service/type-ground.service";
import {TypeGroundModel} from "../../../model/typeGround.model";
import {GroundService} from "../../../service/ground.service";
import {BuildingModel} from "../../../model/building.model";
import {BuildingService} from "../../../service/building.service";

@Component({
  selector: 'app-ground-detail',
  templateUrl: './ground-detail.component.html',
  styleUrls: ['./ground-detail.component.css']
})
export class GroundDetailComponent implements OnInit {

  public subscription: Subscription;
  viewGroundForm: FormGroup;
  public id: number;
  public typeGround:TypeGroundModel;
  public floor: FloorModel;
  public ground;
  public floors: FloorModel[];
  public contracts: ContractModel[];
  public grounds;
  public building:BuildingModel;
  public nameBuilding;
  public nameFloor;
  public nameTypeGround;

  constructor(
    public dialogRef: MatDialogRef<GroundDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public floorService: FloorService,
    public typeGroundService: TypeGroundService,
    public contractService: ContractService,
    public groundService :GroundService,
    public buildingService : BuildingService
  ) {

  }
  ngOnInit() {
    this.floorService.findAll().subscribe(data => this.floors = data);
    this.groundService.findAll().subscribe(data => this.grounds = data);
    this.subscription = this.contractService.findAll().subscribe((data: ContractModel[]) => {
      this.contracts = data;
    });
    this.viewGroundForm = this.fb.group({
      codeGround: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      typeGroundId: ['',[Validators.required]],
      buildingId:['',[Validators.required]],
      note:[''],
      area: ['',[Validators.required, Validators.maxLength(15), Validators.pattern(/^([1-9]([0-9])?)|([0-9]([1-9])?)$/)]],
      floorId:['',[Validators.required]],
      statusGround:[''],
      price:[''],
      beginDay:[''],
      priceManager:[''],
      endDay:['']
    });
    this.load();
  }

  load() {
    this.id = this.data.data1.id;
    this.viewGroundForm.patchValue(this.data.data1);
    this.typeGroundService.findOne(this.data.data1.typeGroundId).subscribe(data => {
      this.typeGround = data;
      this.nameTypeGround = this.typeGround.nameTypeGround;
    });
    this.floorService.findOne(this.data.data1.floorId).subscribe(data => {
      this.floor = data;
      this.nameFloor = this.floor.nameFloor;
    });
    this.buildingService.findOne(this.data.data1.buildingId).subscribe(data => {
      this.building = data;
      this.nameBuilding = this.building.fullName;
    });
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

