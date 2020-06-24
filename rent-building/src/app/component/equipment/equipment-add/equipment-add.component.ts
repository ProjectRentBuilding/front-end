import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EquipmentService} from '../../../service/equipment.service';
import {GroundService} from '../../../service/ground.service';
import {TypeEquipmentService} from '../../../service/type-equipment.service';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {EquipmentModel} from '../../../model/equipment.model';
import {GroundModel} from '../../../model/ground.model';
import {TypeEquipmentModel} from '../../../model/typeEquipment.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-equipment-add',
  templateUrl: './equipment-add.component.html',
  styleUrls: ['./equipment-add.component.css']
})
export class EquipmentAddComponent implements OnInit, OnDestroy {
  public addEquipmentForm: FormGroup;
  public subscription: Subscription;
  public equipmentModel: EquipmentModel[];
  public grounds: GroundModel[] = [];
  public typeEquipment: TypeEquipmentModel[] = [];
  constructor(
    public dialogRef: MatDialogRef<EquipmentAddComponent>,
    private fb: FormBuilder,
    private equipmentService: EquipmentService,
    private groundService: GroundService,
    private typeElementService: TypeEquipmentService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.typeElementService.findAll().subscribe((data: TypeEquipmentModel[]) => {
      this.typeEquipment = data;
    });
    this.groundService.findAll().subscribe((data: GroundModel[]) => {
      this.grounds = data;
    });
    this.addEquipmentForm = this.fb.group({
      id: [''],
      typeEquipmentId: ['', [Validators.required]],
      nameEquipment: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      amountOfBroken: ['', [Validators.required]],
      note: ['', [Validators.required]],
      groundId: ['', [Validators.required]],
    });
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }

  onAddEquipment() {
    this.equipmentService.save(this.addEquipmentForm.value).subscribe(data => {
      this.dialogRef.close();
      this.redirectTo('equipments');
      this.equipmentService.showNotification('', 'Thêm mới thành công, chúc mừng bạn');
    });
  }

  clearFilters() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
