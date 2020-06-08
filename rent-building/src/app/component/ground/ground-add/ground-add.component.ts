import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {GroundService} from '../../../service/ground.service';
import {Router} from '@angular/router';
import {FloorModel} from '../../../model/floor.model';
import {FloorService} from '../../../service/floor.service';

@Component({
  selector: 'app-ground-add',
  templateUrl: './ground-add.component.html',
  styleUrls: ['./ground-add.component.css']
})
export class GroundAddComponent implements OnInit {

  public subscription: Subscription;
  addGroundForm: FormGroup;
  public floors: FloorModel[];

  constructor(
    public dialogRef: MatDialogRef<GroundAddComponent>,
    public groundService: GroundService,
    public floorService: FloorService,
    public routerService: Router,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.floorService.findAll().subscribe(data => this.floors = data);

    this.addGroundForm = this.fb.group({
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
  }
  onAddGround() {
    this.groundService.save(this.addGroundForm.value).subscribe(data => {
      // if (data && data.id) {
      this.routerService.navigate(['grounds']).then(r => this.afterOnAddGround());
      // }

    });
  }
  afterOnAddGround(){
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
