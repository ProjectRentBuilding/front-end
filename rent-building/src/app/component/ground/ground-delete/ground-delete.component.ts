import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {GroundService} from '../../../service/ground.service';
import {ContractModel} from "../../../model/contract";
import {ContractService} from "../../../service/contract.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-ground-delete',
  templateUrl: './ground-delete.component.html',
  styleUrls: ['./ground-delete.component.css']
})
export class GroundDeleteComponent implements OnInit {
  public subscription: Subscription;
  public codeGround;
  public groundId;
  private contracts: ContractModel[];
  constructor(
    public dialogRef: MatDialogRef<GroundDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public groundService: GroundService,
    public contractService: ContractService
  ) { }
  ngOnInit(): void {
    this.subscription = this.contractService.findAll().subscribe((data: ContractModel[]) => {
      this.contracts = data;
    });
    this.codeGround = this.data.data1.codeGround;
    this.groundId= this.data.data1.id;
  }
  deleteGround() {
    this.groundService.delete(this.groundId).subscribe(data => {
      this.afterDeleteGround();
    });
  }
  afterDeleteGround() {
    this.dialogRef.close();
    this.groundService.showNotification('', 'Xóa thành công, chúc mừng bạn');
  }
}

