import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {FormGroup} from '@angular/forms';
import {GroundModel} from '../../../model/ground.model';
import {FloorModel} from '../../../model/floor.model';
import {FloorService} from '../../../service/floor.service';
import {GroundService} from '../../../service/ground.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {CustomerService} from '../../../service/customer.service';
import {Customer} from '../../../model/customer.model';
import {ContractModel} from '../../../model/contract';
import {ContractService} from '../../../service/contract.service';
import {ServicesModel} from '../../../model/services.model';
import {ServicesService} from '../../../service/services.service';
import {ServicesInvoiceComponent} from '../services-invoice/services-invoice.component';
import {MatDialog} from '@angular/material/dialog';
import { ServicesPaymentComponent } from '../services-payment/services-payment.component';

@Component({
  selector: 'app-services-customer',
  templateUrl: './services-customer.component.html',
  styleUrls: ['./services-customer.component.css']
})
export class ServicesCustomerComponent implements OnInit {
  public subscription: Subscription;
  viewServiceForm: FormGroup;
  public id: number;
  public grounds: GroundModel[] = [];
  public floors: FloorModel[] = [];
  public servicesModel: ServicesModel [] = [];
  public services: ServicesModel [] = [];
  public contracts: ContractModel[] = [];
  public contract: ContractModel[] = [];
  public tempMonthYear: String;
  public idContract = new Array<string>();
  public temp: number;
  public checkDate = false;
  // @ts-ignore
  public dataCustomer: Customer = [];
  public nameCustomer: String;
  public size = 5;
  public servicePage: any;
  public totalPages: number = 1;
  public page = 1;
  public pages = [];
  public checkPage = 0;
  startDate = new Date(1990, 0, 1);
  public pageClicked: number = 0;
  public idContractSearch: number;
  public startDateSearch = '2019-01-01';
  public endDateSearch = '2020-01-01';
  public messageTimeValidate: string;
  public groundId: number;
  public servicePay: ServicesModel;

  constructor(
    public floorService: FloorService,
    private groundService: GroundService,
    private servicesService: ServicesService,
    private dialog: MatDialog,
    private router: Router,
    public customerService: CustomerService,
    public contractService: ContractService,
    private activatedRoute: ActivatedRoute
  ) { }


  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.customerService.findOne(parseInt(paramMap.get('id'))).subscribe(data => {
        this.dataCustomer = data;
        this.nameCustomer = this.dataCustomer.name;
        for (let i =0 ; i< this.dataCustomer.contracts.length; i++ ) {
          this.idContract.push(this.dataCustomer.contracts[i].id);
          this.grounds.push(this.dataCustomer.contracts[i].ground);
          this.floors.push(this.dataCustomer.contracts[i].ground.floor);
        }
        this.idContractSearch = this.dataCustomer.contracts[0].id;
        this.loadData(0);
      });
    });
  }

  formatsDate: string[] = [
    'dd/MM/yyyy',
  ];
  onNext() {
    if (this.pageClicked == this.totalPages - 1) {
    } else {
      this.pageClicked++;
    }
    this.loadData(this.pageClicked);
  }

  onPrevious() {
    if (this.pageClicked == 0) {
    } else {
      this.pageClicked--;
    }
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

  checkTime(startDateSearch: Date, endDateSearch: Date) {
    if (startDateSearch <= endDateSearch) {
      this.checkDate = false;
      this.checkIdContract();
      this.loadData(0);
    }else {
      this.checkDate = true;
      this.messageTimeValidate = 'Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc';
    }
  }
  checkPages(page) {
    console.log(page);
    this.checkPage = page;
  }

  checkIdContract() {
    for (let i =0 ; i< this.dataCustomer.contracts.length; i++ ) {
      if (this.dataCustomer.contracts[i].ground.id == this.groundId ) {
        return this.idContractSearch = this.dataCustomer.contracts[i].id;
      }
    }
  }

  public loadData(page) {
    this.servicesService.getServiceCustomer(page, this.size, this.startDateSearch, this.endDateSearch, this.idContractSearch)
      .subscribe(
        data => {
          this.pageClicked = page;
          this.servicePage = data;
          this.servicesModel = this.servicePage.content;
          if (this.servicesModel.length >0) {
            this.tempMonthYear = this.servicesModel[0].monthYear;
          }
          this.totalPages = this.servicePage.totalPages;
          this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
        }
      );
  }

  openDialogPayment(): void {
    const dialogRef = this.dialog.open(ServicesPaymentComponent, {
      width: '400px',
      height: '300px',
      data: {data1:  this.servicePay , data2: this.dataCustomer},
      disableClose: false,
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  pay(id: number) {
    this.servicesService.findOne(id).subscribe(data => {
      this.servicePay = data;
      this.openDialogPayment();
    });
  }

  openDialogInvoice(): void {
      const dialogRef = this.dialog.open(ServicesInvoiceComponent, {
        width: '70%',
        height: '80%',
        data: {data1:  this.dataCustomer, data2: this.tempMonthYear},
        disableClose: false,
      });
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
        this.loadData(this.pageClicked);
      });
  }

  setGroundId(value: any) {
    this.groundId = value;
  }

}
