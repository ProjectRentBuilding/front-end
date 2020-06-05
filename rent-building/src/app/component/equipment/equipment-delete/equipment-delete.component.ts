import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {EquipmentService} from '../../../service/equipment.service';

@Component({
  selector: 'app-equipment-delete',
  templateUrl: './equipment-delete.component.html',
  styleUrls: ['./equipment-delete.component.css']
})
export class EquipmentDeleteComponent implements OnInit {
  public equipmentOfType;
  public equipmentOfId;
  constructor(
    public dialogRef: MatDialogRef<EquipmentDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public equipmentService: EquipmentService
  ) { }

  ngOnInit() {
    this.equipmentOfType = this.data.data1.type;
    this.equipmentOfId = this.data.data1.id;
  }
  deleteEmployee() {
    this.equipmentService.deleteEquipment(this.equipmentOfId).subscribe(data => {
      this.dialogRef.close();
    });
  }
}
