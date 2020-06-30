import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';
import {ServicesService} from '../../../service/services.service';
import {GroundModel} from '../../../model/ground.model';
import {FloorModel} from '../../../model/floor.model';
import {ServicesModel} from '../../../model/services.model';
import {ContractModel} from '../../../model/contract';
import {Customer} from '../../../model/customer.model';

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

  constructor(
    public dialogRef: MatDialogRef<ServicesInvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private servicesService: ServicesService,
    public router: Router
  ) { }

  ngOnInit() {

  }

  checkTime(startDateSearch: any, endDateSearch: any) {

  }
}
