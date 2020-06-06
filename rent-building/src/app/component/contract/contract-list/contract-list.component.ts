import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ContractModel} from "../../../model/contract";
import {ContractService} from "../../../service/contract.service";
import {MatDialog} from "@angular/material/dialog";
import {ContractDeleteComponent} from "../contract-delete/contract-delete.component";

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css']
})
export class ContractListComponent implements OnInit , OnDestroy {
  public page = 1;
  public search;
  public subscription: Subscription;
  public contracts: ContractModel[] = [];
  public contract: ContractModel;
  message = '';
  totalRec: number;

  constructor(
    public contractService: ContractService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.contractService.findAll().subscribe(data => {
      this.contracts = data;
      this.totalRec = this.contracts.length;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  formatsDate : string[] = [
    'dd/MM/yyyy',
  ];

  openDialog(contractId): void {


    this.contractService.findOne(contractId).subscribe(dataOfContract => {
      const dialogRef = this.dialog.open(ContractDeleteComponent, {
        width: '500px',
        height: '250px',
        data: {data1: dataOfContract},
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.ngOnInit();

      });
    });
  }

}
