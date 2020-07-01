import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';
import {ServicesService} from '../../../service/services.service';
import {GroundModel} from '../../../model/ground.model';
import {FloorModel} from '../../../model/floor.model';
import {ServicesModel} from '../../../model/services.model';
import {ContractModel} from '../../../model/contract';
import {Customer} from '../../../model/customer.model';
import * as html2pdf from 'html2pdf.js';

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
  public tempMonthYear: String;
  public tempNameService: String;
  public idContract = new Array<string>();
  public temp: number;
  public dateNow: Date = new Date();
  // @ts-ignore
  public dataCustomer: Customer = [];
  public nameCustomer: String;
  public servicePage: any;
  public monthYearSearch = '2019-01-01';
  public idContractSearch: number;
  public tempFloor= '';
  public tempGround= '';
  public phoneCustomer: number;
  public totalMoney: number = 0;


  constructor(
    public dialogRef: MatDialogRef<ServicesInvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private servicesService: ServicesService,
    public router: Router
  ) { }

  ngOnInit() {
    this.nameCustomer = this.data.data1.name;
    this.dataCustomer = this.data.data1;
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
    this.servicesService.searchInvoice(this.monthYearSearch, this.idContractSearch)
      .subscribe(data => {
          this.servicesModel = data;
          console.log(this.servicesModel);
            for (let value of this.servicesModel) {
            this.totalMoney += value.consume * value.price;
            }
        }
      );
  }
  formatsDate: string[] = [
    'dd/MM/yyyy',
  ];
  printToPDF() {
    const options = {

      name: 'baocao.pdf',
      image: {type: 'jpeg'},
      html2canvas: {scales: 1, width: 7000, height: 5000},
      jsPDF: {orientation: 'portrait', unit: 'mm', format: [1000, 1000]}
    };

    const element: Element = document.getElementById('invoice94');

    html2pdf()
      .from(element)
      .set(options)
      .save();

  }
  search() {
    this.loadData();
  }
}
