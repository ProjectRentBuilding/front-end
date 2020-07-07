import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';
import {ServicesService} from '../../../service/services.service';
import {GroundModel} from '../../../model/ground.model';
import {FloorModel} from '../../../model/floor.model';
import {ServicesModel} from '../../../model/services.model';
import {ContractModel} from '../../../model/contract';
import {Customer} from '../../../model/customer.model';
import { ExportAsService, ExportAsConfig, SupportedExtensions } from 'ngx-export-as';


@Component({
  selector: 'app-services-invoice',
  templateUrl: './services-invoice.component.html',
  styleUrls: ['./services-invoice.component.css']
})
export class ServicesInvoiceComponent implements OnInit {
  public grounds: GroundModel[] = [];
  public floors: FloorModel[] = [];
  public servicesModel: ServicesModel [] = [];
  public services: ServicesModel [] = [];
  public contracts: ContractModel[] = [];
  public contract: ContractModel[] = [];
  // public tempMonthYear: String;
  // public tempNameService: String;
  public idContract = new Array<string>();
  public temp: number;
  public dateNow: Date = new Date();
  // @ts-ignore
  public dataCustomer: Customer = [];
  public nameCustomer: String;
  public servicePage: any;
  public monthYearSearch = '';
  public idContractSearch: number;
  public tempFloor= '';
  public tempGround= '';
  public phoneCustomer: number;
  public totalMoney: number;
  public flagInvoice = false;
  public tempMonth = '';
  public groundId: number;
  config: ExportAsConfig = {
    type: 'pdf',
    elementIdOrContent: 'mytable',
    options: {
      jsPDF: {
        orientation: 'landscape'
      },
      pdfCallbackFn: this.pdfCallbackFn // to add header and footer
    }
  };

  constructor(
    private exportAsService: ExportAsService,
    public dialogRef: MatDialogRef<ServicesInvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private servicesService: ServicesService,
    public router: Router
  ) { }

  ngOnInit() {
    this.nameCustomer = this.data.data1.name;
    this.dataCustomer = this.data.data1;
    this.monthYearSearch = this.data.data2;
    this.phoneCustomer = this.dataCustomer.phone;
    for (let i =0 ; i< this.dataCustomer.contracts.length; i++ ) {
      this.idContract.push(this.dataCustomer.contracts[i].id);
      this.grounds.push(this.dataCustomer.contracts[i].ground);
      this.floors.push(this.dataCustomer.contracts[i].ground.floor);
    }
    this.tempFloor =  this.floors[0].nameFloor;
    this.tempGround = this.grounds[0].codeGround;
    this.idContractSearch = this.dataCustomer.contracts[0].id;
    this.loadData();
  }
  public loadData() {
    this.checkIdContract();
    this.totalMoney = 0;
    this.tempMonth = this.monthYearSearch.slice(5,7) +'-'+this.monthYearSearch.slice(0,4);
    this.servicesService.searchInvoice(this.monthYearSearch, this.idContractSearch)
      .subscribe(data => {
          this.servicesModel = data;
          for (let value of this.servicesModel) {
            this.totalMoney += value.consume * value.price;
          }
        }
      );
  }
  formatsDate: string[] = [
    'dd/MM/yyyy',
  ];

  exportAsString(type: SupportedExtensions, opt?: string) {
    this.config.elementIdOrContent = '<div> test string </div>';
    this.exportAs(type, opt);
    setTimeout(() => {
      this.config.elementIdOrContent = 'mytable';
    }, 1000);
  }

  exportAs(type: SupportedExtensions, opt?: string) {
    this.config.type = type;
    if (opt) {
      this.config.options.jsPDF.orientation = opt;
    }
    this.exportAsService.save(this.config, 'myFile').subscribe(() => {
      // save started
    });
  }

  pdfCallbackFn (pdf: any) {
    // example to add page number as footer to every page of pdf
    const noOfPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= noOfPages; i++) {
      pdf.setPage(i);
      pdf.text('Page ' + i + ' of ' + noOfPages, pdf.internal.pageSize.getWidth() - 100, pdf.internal.pageSize.getHeight() - 30);
    }
  }

  search() {
    this.loadData();
  }

  checkIdContract() {
    for (let i =0 ; i< this.dataCustomer.contracts.length; i++ ) {
      if (this.dataCustomer.contracts[i].ground.id == this.groundId ) {
        return this.idContractSearch = this.dataCustomer.contracts[i].id;
      }
    }
  }

  setGroundId(value: any) {
    this.groundId = value;
    for (let item of this.grounds) {
      if (item.id == value ) {
        this.tempGround = item.codeGround;
        // @ts-ignore
        this.tempFloor = item.floor.nameFloor;
        break;
      }
    }
  }

  checkInvoice() {
    this.flagInvoice = !this.flagInvoice;
  }
}
