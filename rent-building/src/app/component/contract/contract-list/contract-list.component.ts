import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ContractModel} from "../../../model/contract";
import {ContractService} from "../../../service/contract.service";
import {MatDialog} from "@angular/material/dialog";
import {ContractDeleteComponent} from "../contract-delete/contract-delete.component";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Route, Router} from "@angular/router";

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
  public nameCustomerSearch = "";
  public codeGroundSearch = "";
  public startRentDaySearch = "";
  public endRentDaySearch = "";
  public formSearch: FormGroup;
  public subscription: Subscription;
  public contract: ContractModel;
  message = '';
  totalRec: number;

  // public flagAfterAdd = 1;

  public sessionId: any;

  constructor(
    public contractService: ContractService,
    public dialog: MatDialog,
    public formBuilder: FormBuilder,
    public route: ActivatedRoute
  ) {

  }

  ngOnInit() {

    this.contractService.getContractPageSearch(0, this.size, this.nameCustomerSearch, this.codeGroundSearch, this.startRentDaySearch, this.endRentDaySearch)
      .subscribe(
        data => {
          this.pageClicked = 0;
          this.contractPage = data;
          this.contracts = this.contractPage.content;
          this.totalPages = this.contractPage.totalPages;
          this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
        }, () => {

        }, () => {
          if (window.sessionStorage.getItem("1") === null) {
            this.loadData(0);
          }

          window.sessionStorage.setItem("2", String(this.totalPages));


          if (window.sessionStorage.getItem("1") === "1") {
            this.onLast();
            window.sessionStorage.clear();
          }
        }
      );







    this.formSearch = this.formBuilder.group({
      nameCustomerSearch: [''],
      codeGroundSearch: [''],
      startRentDaySearch: [''],
      endRentDaySearch: ['']
    });

  }

  onSearch(page) {
    this.nameCustomerSearch = this.formSearch.value.nameCustomerSearch;

    this.codeGroundSearch = this.formSearch.value.codeGroundSearch;
    this.startRentDaySearch = this.formSearch.value.startRentDaySearch;
    this.endRentDaySearch = this.formSearch.value.endRentDaySearch;

    let start = new Date(this.startRentDaySearch);
    let end = new Date(this.endRentDaySearch);

    let resultStart;
    let resultEnd;

    if (isNaN(start.getFullYear())) {
      resultStart = "1970-01-01";
    } else {
      resultStart = "" + start.getFullYear() + "-" + (start.getMonth()+1) + "-" + start.getDay();
    }

    if (isNaN(end.getFullYear())) {
      resultEnd = "2030-1-1";
    } else {
      resultEnd = "" + end.getFullYear() + "-" + (end.getMonth()+1) + "-" + end.getDay();
      // alert(resultEnd);
    }


    this.contractService.getContractPageSearch(page, this.size, this.nameCustomerSearch, this.codeGroundSearch, resultStart, resultEnd)
      .subscribe(
        data => {
          this.pageClicked = page;
          this.contractPage = data;
          this.contracts = this.contractPage.content;
          this.totalPages = this.contractPage.totalPages;
          this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
        }, () => {

        }, () => {
          if (this.contracts.length == 0) {
            this.message = "Không tìm thấy kết quả nào phù hợp.";
          } else {
            this.message = "";
          }
        }
      );

  }

  loadData(page) {
    this.contractService.getContractPageSearch(page, this.size, this.nameCustomerSearch, this.codeGroundSearch, this.startRentDaySearch, this.endRentDaySearch)
      .subscribe(
        data => {
          this.pageClicked = page;
          this.contractPage = data;
          this.contracts = this.contractPage.content;
          this.totalPages = this.contractPage.totalPages;
          this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
        }, () => {

        }, () => {
          this.message = "";
        }
      );
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
    this.nameCustomerSearch = "";
    this.codeGroundSearch = "";
    this.startRentDaySearch = "";
    this.endRentDaySearch = "";
    this.loadData(0);

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
        width: '600px',
        height: '330px',
        data: {data1: dataOfContract},
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.loadData(this.pageClicked)

      });
    });
  }

  formatsDateYMD: string[] = [
    'yyyy/MM/dd',
  ];
  startDate = new Date(2020, 0, 1);


}
