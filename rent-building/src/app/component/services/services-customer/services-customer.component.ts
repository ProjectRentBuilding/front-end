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
  public month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] ;
  public years = new Array<string>();
  public idContract = new Array<string>();
  public temp: number;
  public dateNow: Date = new Date();
  // @ts-ignore
  public dataCustomer: Customer = [];
  public nameCustomer: String;
  public page = 1;
  public size = 5;
  public servicePage: any;
  public totalPages: number = 1;
  public pages = [];
  public pageClicked: number = 0;
  public idContractSearch: number;
  public startDateSearch = '';
  public endDateSearch = '';

  constructor(
    // public floorService: FloorService,
    // private groundService: GroundService,
    private servicesService: ServicesService,
    private router: Router,
    public customerService: CustomerService,
    public contractService: ContractService,
    private activatedRoute: ActivatedRoute
  ) { }


  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      console.log(paramMap.get('id'));
      this.customerService.findOne(parseInt(paramMap.get('id'))).subscribe(data => {
        this.dataCustomer = data;
        this.nameCustomer = this.dataCustomer.name;
        for (let i =0 ; i< this.dataCustomer.contracts.length; i++ ) {
          this.idContract.push(this.dataCustomer.contracts[i].id);
        }
        // @ts-ignore
        console.log(this.idContract);
      });
    });
    this.contractService.findAll().subscribe((data : ContractModel[]) =>{
      this.contracts = data;
        for (let value of this.contracts) {
          for (let i of this.idContract) {
            // @ts-ignore
            if (value.id == i){
              // @ts-ignore
              this.grounds.push(value.ground);
              // @ts-ignore
              this.floors.push(value.ground.floor);
            }
          }
        }
      console.log(this.grounds);
    });
    this.servicesService.findAll().subscribe((data: ServicesModel[]) => {
      this.services = data;
      for (let value of this.services) {
          // @ts-ignore
        if (value.contract.customer.name == this.nameCustomer) {
            this.servicesModel.push(value);
          }
      }
      console.log(this.servicesModel)
    });
    for (let i = 0; i <= 5; i++) {
      this.temp = this.dateNow.getFullYear();
      this.years.push( String(this.temp - i));
    }
  }

  formatsDate: string[] = [
    'dd/MM/yyyy',
  ];

  loadData(page) {
    this.servicesService.getServiceCustomer(page, this.size, this.idContractSearch, this.startDateSearch, this.endDateSearch)
      .subscribe(
        data => {
          this.pageClicked = page;
          this.servicePage = data;
          this.services = this.servicePage.content;
          this.totalPages = this.servicePage.totalPages;
          this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
        }
      );
  }
  searchServiceCustomers() {

  }

  checkGround() {

  }

  checkTime() {
    console.log(this.startDateSearch);
    console.log(this.endDateSearch);
  }
}
