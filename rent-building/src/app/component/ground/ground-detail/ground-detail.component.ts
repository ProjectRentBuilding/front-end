import {Component, Inject, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

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
  public floor;
  constructor(
    public dialogRef: MatDialogRef<GroundDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) {
  }
  ngOnInit() {
    this.viewGroundForm = this.fb.group({
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
    this.viewGroundForm.patchValue(this.data.data1);
    this.typeGround = this.data.data1.typeGround;
    this.floor=this.data.data1.floor;
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

