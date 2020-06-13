import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {GroundModel} from '../../../model/ground.model';
import {MatDialog} from '@angular/material';
import {GroundService} from '../../../service/ground.service';
import {GroundDeleteComponent} from '../ground-delete/ground-delete.component';
import {GroundAddComponent} from '../ground-add/ground-add.component';
import {GroundDetailComponent} from '../ground-detail/ground-detail.component';
import {GroundEditComponent} from '../ground-edit/ground-edit.component';
import {ContractService} from "../../../service/contract.service";
import {ContractModel} from "../../../model/contract";


@Component({
  selector: 'app-ground-list',
  templateUrl: './ground-list.component.html',
  styleUrls: ['./ground-list.component.css']
})
export class GroundListComponent implements OnInit, OnDestroy {
  public subscription: Subscription;
  public subscription2: Subscription;
  public grounds: GroundModel[];
  public contracts: ContractModel[];
  public totalRec: number;
  public page = 1;
  public searchText;

  constructor(
    public groundService: GroundService,
    public contractService: ContractService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.subscription = this.groundService.findAll().subscribe((data: GroundModel[]) => {
      this.grounds = data;
      this.totalRec = this.grounds.length;
    });
    // this.subscription2=this.contractService.findAll().subscribe((data2: ContractModel[])=>{
    //   this.contracts=data2;
    // });


  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  openDialogAddNew(): void {
    const dialogRef = this.dialog.open(GroundAddComponent, {
      width: '800px',
      height: '540px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  openDialogView(id): void {
    this.groundService.findOne(id).subscribe(dataOfGroundModel => {
      const dialogRef = this.dialog.open(GroundDetailComponent, {
        width: '800',
        height: '540px',
        data: {data1: dataOfGroundModel},
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    });
  }

  openDialogEdit(id): void {
    this.groundService.findOne(id).subscribe(dataOfGroundModel => {
      const dialogRef = this.dialog.open(GroundEditComponent, {
        width: '800',
        height: '540px',
        data: {data1: dataOfGroundModel},
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    });
  }


  openDialogDelete(id): void {
    this.groundService.findOne(id).subscribe(dataOfGroundModel => {
      const dialogRef = this.dialog.open(GroundDeleteComponent, {
        width: '800',
        height: '540px',
        data: {data1: dataOfGroundModel},
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    });
  }
}



