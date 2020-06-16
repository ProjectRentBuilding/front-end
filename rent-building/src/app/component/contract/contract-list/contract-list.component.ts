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
export class ContractListComponent implements OnInit, OnDestroy {
  public size = 5;
  public contractPage: any;
  public contracts: ContractModel[] = [];
  public totalPages: number = 1;
  public pages = [];
  pageClicked: number = 0;
  // public search;
  public searchText = "";
  public subscription: Subscription;

  public contract: ContractModel;
  message = '';
  totalRec: number;

  constructor(
    public contractService: ContractService,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    // this.contractService.findAll().subscribe(data => {
    //         //   this.contracts = data;
    //         //   this.totalRec = this.contracts.length;
    //         // });
    this.loadData(0);
  }

  loadData(page) {
    console.log(this.searchText);
    this.contractService.getContractPage(page, this.size, this.searchText)
      .subscribe(
        data => {
          this.pageClicked = page;
          this.contractPage = data;
          this.contracts = this.contractPage.content;
          this.totalPages = this.contractPage.totalPages;
          this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
        }
      )
  }

  onNext() {
    if (this.pageClicked == this.totalPages - 1) {
    } else this.pageClicked++;
    this.loadData(this.pageClicked);
  }

  onPrevious() {
    if (this.pageClicked == 0) {
    } else this.pageClicked--;
    this.loadData(this.pageClicked);
  }

  onFirst() {
    this.pageClicked = 0;
    this.loadData(this.pageClicked);
  }

  onLast() {
    this.pageClicked = this.totalPages - 1;
    this.loadData(this.pageClicked);
  }

  refreshForm() {
    this.searchText = "";
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  formatsDate: string[] = [
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
