import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {GroundService} from '../../../service/ground.service';
import {Router} from '@angular/router';
import {FloorModel} from '../../../model/floor.model';
import {FloorService} from '../../../service/floor.service';
import {TypeGroundService} from 'src/app/service/type-ground.service';
import {TypeGroundModel} from '../../../model/typeGround.model';
import {BuildingModel} from "../../../model/building.model";
import {BuildingService} from "../../../service/building.service";

@Component({
  selector: 'app-ground-add',
  templateUrl: './ground-add.component.html',
  styleUrls: ['./ground-add.component.css']
})
export class GroundAddComponent implements OnInit {

  public subscription: Subscription;
  addGroundForm: FormGroup;
  public floors: FloorModel[];
  public typeGrounds: TypeGroundModel[];
  public buildings:BuildingModel[];

  constructor(
    public dialogRef: MatDialogRef<GroundAddComponent>,
    public groundService: GroundService,
    public floorService: FloorService,
    public typeGroundService: TypeGroundService,
    public buildingService : BuildingService,
    public routerService: Router,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.floorService.findAll().subscribe(data => this.floors = data);
    this.typeGroundService.findAll().subscribe(data => this.typeGrounds = data);
    this.buildingService.findAll().subscribe(data => this.buildings = data);

    this.addGroundForm = this.fb.group({
      codeGround: ['', [Validators.required, Validators.pattern(/^MB\d{3}$/)]],
      typeGroundId: ['', [Validators.required]],
      buildingId: ['', [Validators.required]],
      note: [''],
      area: ['', [Validators.required, Validators.maxLength(15), Validators.pattern(/^([1-9]([0-9])?)|([0-9]([1-9])?)$/)]],
      floorId: ['', [Validators.required]],
      statusGround: [''],
      price: [''],
      priceManager: ['']
    });
  }

  onAddGround() {
    this.groundService.save(this.addGroundForm.value).subscribe(data => {
      // if (data && data.id) {
      this.routerService.navigate(['grounds']).then(r => this.afterOnAddGround());
      // }
    });
  }

  afterOnAddGround() {
    this.dialogRef.close();
    this.groundService.showNotification('', 'Thêm mới thành công, chúc mừng bạn');

  }


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  clearFilters() {
    this.ngOnInit();
  }
}

