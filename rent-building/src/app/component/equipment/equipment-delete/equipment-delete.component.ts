import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {EquipmentService} from '../../../service/equipment.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-equipment-delete',
  templateUrl: './equipment-delete.component.html',
  styleUrls: ['./equipment-delete.component.css']
})
export class EquipmentDeleteComponent implements OnInit {
  public equipmentOfName;
  public equipmentOfId;
  constructor(
    public dialogRef: MatDialogRef<EquipmentDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public router: Router,
    public equipmentService: EquipmentService
  ) { }

  ngOnInit() {
    this.equipmentOfName = this.data.data1.nameEquipment;
    this.equipmentOfId = this.data.data1.id;
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }

  deleteEquipment() {
    this.equipmentService.delete(this.equipmentOfId).subscribe(data => {
      this.dialogRef.close();
      this.redirectTo('equipments');
      this.equipmentService.showNotification('', 'Xóa thành công, chúc mừng bạn');
    });
  }

}
