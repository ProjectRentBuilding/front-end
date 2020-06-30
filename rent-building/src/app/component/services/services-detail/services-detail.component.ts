import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {CustomerService} from "../../../service/customer.service";
import {Customer} from "../../../model/customer.model";
import {ContractModel} from "../../../model/contract";
import {ServicesModel} from "../../../model/services.model";
import {ContractService} from "../../../service/contract.service";
import {GroundModel} from "../../../model/ground.model";
import {FloorModel} from "../../../model/floor.model";
import {ServicesService} from "../../../service/services.service";

@Component({
  selector: 'app-services-detail',
  templateUrl: './services-detail.component.html',
  styleUrls: ['./services-detail.component.css']
})
export class ServicesDetailComponent implements OnInit {
  public subscription: Subscription;
  public years = new Array<string>();
  public temp: number;
  public dateNow: Date = new Date();
  public id: number;
  public grounds: GroundModel[] = [];
  public floors: FloorModel[] = [];
  // @ts-ignore
  public dataCustomer: Customer = [];
  public services: ServicesModel [] = [];
  public servicesDistinct= new Array<string>();
  public servicesModel: ServicesModel [] = [];
  public nameCustomer: String;
  public idContract = new Array<string>();
  public contracts: ContractModel[] = [];
  public servicePage: any;
  public totalPages: number = 1;
  public pages = [];
  size=5;
  public pageClicked: number = 0;
  idContractSearch;
  startDateSearch="2000-01-01";
  endDateSearch="2020-01-01";

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    public customerService: CustomerService,
    public contractService: ContractService,
    private servicesService: ServicesService
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
        this.idContractSearch=this.dataCustomer.contracts[0].id;
        this.loadData(0);
      });
    });
    this.servicesService.getServiceDistinct().subscribe((data: string[]) => {
      this.servicesDistinct = data;
    });
    // this.servicesService.findAll().subscribe((data: ServicesModel[]) => {
    //       this.services = data;
    //       for (let value of this.services) {
    //         // @ts-ignore
    //         if (value.contract.customer.name == this.nameCustomer) {
    //           this.servicesModel.push(value);
    //         }
    //       }
    //     });


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
          this.servicesModel = this.servicePage.content;
          this.totalPages = this.servicePage.totalPages;
          this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
        }
      );
  }

}
