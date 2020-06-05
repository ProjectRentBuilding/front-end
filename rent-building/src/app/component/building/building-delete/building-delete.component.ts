import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {BuildingService} from '../../../service/building.service';

@Component({
  selector: 'app-building-delete',
  templateUrl: './building-delete.component.html',
  styleUrls: ['./building-delete.component.css']
})
export class BuildingDeleteComponent implements OnInit {

  public buildingName;
  public buildingId;
  constructor(
    public dialogRef: MatDialogRef<BuildingDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public buildingService: BuildingService,
  ) { }
  ngOnInit(): void {
    this.buildingName = this.data.data1.fullName;
    this.buildingId = this.data.data1.id;
  }
  deleteBuilding() {
    this.buildingService.delete(this.buildingId).subscribe(data => {
      this.afterDeleteBuilding();
    });
  }
  afterDeleteBuilding() {
    this.dialogRef.close();
    this.buildingService.showNotification('', 'Xóa thành công, chúc mừng bạn');

  }

}

