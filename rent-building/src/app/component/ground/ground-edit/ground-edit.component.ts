import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {GroundService} from '../../../service/ground.service';
import {Router} from '@angular/router';
import {FloorModel} from '../../../model/floor.model';
import {FloorService} from '../../../service/floor.service';

@Component({
  selector: 'app-ground-edit',
  templateUrl: './ground-edit.component.html',
  styleUrls: ['./ground-edit.component.css']
})
export class GroundEditComponent implements OnInit, OnDestroy {

  public subscription: Subscription;
  editGroundForm: FormGroup;
  public floors: FloorModel[];

  public id: number;
  constructor(
    public dialogRef: MatDialogRef<GroundEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public groundService: GroundService,
    public floorService: FloorService,
    public routerService: Router,
    private fb: FormBuilder,
  ) {
  }
  ngOnInit() {
    this.floorService.findAll().subscribe(data => this.floors = data);
    this.editGroundForm = this.fb.group({
      codeGround: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      typeGround: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      note:[''],
      area: ['',[Validators.required, Validators.maxLength(15), Validators.pattern(/^([1-9]([0-9])?)|([0-9]([1-9])?)$/)]],
      floor:['',[Validators.required]],
      statusGround:[''],
      price:[''],
      beginDay:[''],
      endDay:['']

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


