import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {EquipmentService} from '../../../service/equipment.service';
import {Router} from '@angular/router';
import {GroundModel} from '../../../model/ground.model';
import {GroundService} from '../../../service/ground.service';

@Component({
  selector: 'app-equipment-delete',
  templateUrl: './equipment-delete.component.html',
  styleUrls: ['./equipment-delete.component.css']
})
export class EquipmentDeleteComponent implements OnInit {
  public equipmentOfName;
  public equipmentOfId;
  public grounds: GroundModel[] = [];
  public checkDelete;
  constructor(
    public dialogRef: MatDialogRef<EquipmentDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public router: Router,
    private groundService: GroundService,
    public equipmentService: EquipmentService
  ) { }

  ngOnInit() {
    const a = this.groundService.findAll().subscribe((data: GroundModel[]) => {
      this.grounds = data;
      this.equipmentOfName = this.data.data1.nameEquipment;
      this.equipmentOfId = this.data.data1.id;
      console.log(this.data.data1.groundId);
      for (let item = 0; item < this.grounds.length; item ++) {
        this.checkDelete = this.grounds[item].id;
        if (this.checkDelete === this.data.data1.groundId) {
          const temp = (this.grounds[item].statusGround);
          if (temp === 'Đang sửa chữa') {
            return 0;
          } else {
            this.dialogRef.close();
            this.equipmentService.showNotification('', 'Không thể xóa trang thiết bị thuộc mặt bằng đang thuê');
          }
          console.log('Delete:' + this.checkDelete);
        }
      }
    });
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }

  deleteEquipment() {
    this.equipmentService.delete(this.equipmentOfId).subscribe(data => {
      this.dialogRef.close();
      // this.redirectTo('equipments');
      this.equipmentService.showNotification('', 'Xóa thành công thiết bị có id là: '+ this.equipmentOfId + ' và có tên là : ' + this.equipmentOfName);
    });
  }

}
