import {Component, Inject, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FloorService} from "../../../service/floor.service";
import {FloorModel} from "../../../model/floor.model";
import {ContractModel} from "../../../model/contract";
import {ContractService} from "../../../service/contract.service";
import {GroundService} from "../../../service/ground.service";
import {TypeGroundService} from "../../../service/type-ground.service";

@Component({
  selector: 'app-ground-detail',
  templateUrl: './ground-detail.component.html',
  styleUrls: ['./ground-detail.component.css']
})
export class GroundDetailComponent implements OnInit {

  public subscription: Subscription;
  viewGroundForm: FormGroup;
  public id: number;
  public typeGround;
  public ground;
  public nameTypeGround;
  public floors: FloorModel[];
  public contracts: ContractModel[];

  constructor(
    public dialogRef: MatDialogRef<GroundDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public floorService: FloorService,
    public typeGroundService: TypeGroundService,
    public contractService: ContractService,
  ) {

  }
  ngOnInit() {
    this.floorService.findAll().subscribe(data => this.floors = data);
    this.subscription = this.contractService.findAll().subscribe((data: ContractModel[]) => {
      this.contracts = data;
    });
    this.viewGroundForm = this.fb.group({
      codeGround: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      typeGroundId: ['',[Validators.required]],
      note:[''],
      area: ['',[Validators.required, Validators.maxLength(15), Validators.pattern(/^([1-9]([0-9])?)|([0-9]([1-9])?)$/)]],
      floorId:['',[Validators.required]],
      statusGround:[''],
      price:[''],
      beginDay:[''],
      endDay:['']
    });
    this.loadData();
  }
  loadData() {
    this.id = this.data.data1.id;
    console.log(this.id);
    this.viewGroundForm.patchValue(this.data.data1);
    // this.typeGround = this.typeGroundService.findOne(this.data.data1.typeGroundId);
    this.typeGroundService.findOne(this.data.data1.typeGroundId).subscribe(data => this.typeGround = data);
    console.log(this.typeGround);
    this.nameTypeGround = this.typeGround.nameTypeGround;
    console.log(this.nameTypeGround);
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

