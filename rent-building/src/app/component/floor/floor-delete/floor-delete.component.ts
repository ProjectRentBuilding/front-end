import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FloorService} from '../../../service/floor.service';

@Component({
  selector: 'app-floor-delete',
  templateUrl: './floor-delete.component.html',
  styleUrls: ['./floor-delete.component.css']
})
export class FloorDeleteComponent implements OnInit {

  public floorName;
  public floorId;
  constructor(
    public dialogRef: MatDialogRef<FloorDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public floorService: FloorService,
  ) { }
  ngOnInit(): void {
    this.floorName = this.data.data1.nameFloor;
    this.floorId = this.data.data1.id;
  }
  deleteFloor() {
    this.floorService.delete(this.floorId).subscribe(data => {
      this.afterDeleteFloor();
    });
  }
  afterDeleteFloor() {
    this.dialogRef.close();
    this.floorService.showNotification('', 'Xóa thành công, chúc mừng bạn');
  }
}

