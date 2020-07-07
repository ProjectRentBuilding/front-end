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
import {formatDate} from "@angular/common";
import { ExportAsService, ExportAsConfig, SupportedExtensions } from 'ngx-export-as';


@Component({
  selector: 'app-services-detail',
  templateUrl: './services-detail.component.html',
  styleUrls: ['./services-detail.component.css']
})
export class ServicesDetailComponent implements OnInit {
  public subscription: Subscription;
  public dateNow: Date = new Date();
  public id: number;
  public grounds: GroundModel[] = [];
  public floors: FloorModel[] = [];
  // @ts-ignore
  public dataCustomer: Customer = [];
  public services: ServicesModel [] = [];
  public servicesDistinct = new Array<string>();
  public servicesModel: ServicesModel [] = [];
  public nameCustomer: String;
  public idContract = new Array<string>();
  public contracts: ContractModel[] = [];
  public servicePage: any;
  public totalPages: number = 1;
  public pages = [];
  size = 5;
  public pageClicked: number = 0;
  idContractSearch;
  nameService = "";
  startDateSearch = "2000-01-01";
  endDateSearch = "2021-01-01";
  message = "";
  messageService = "";
  checkValidateInputYear = false;
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
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    public customerService: CustomerService,
    public contractService: ContractService,
    private servicesService: ServicesService,
  ) {
  }

  ngOnInit() {
    this.servicesService.getServiceDistinct().subscribe((data: string[]) => {
      this.servicesDistinct = data;
      this.nameService = this.servicesDistinct[0];
    });
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.customerService.findOne(parseInt(paramMap.get('id'))).subscribe(data => {
        this.dataCustomer = data;
        this.nameCustomer = this.dataCustomer.name;
        this.startDateSearch = paramMap.get('monthYear');
        this.endDateSearch = formatDate(this.dateNow, 'yyyy-MM-dd', 'en-US');
        for (let i = 0; i < this.dataCustomer.contracts.length; i++) {
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

  loadData(page) {
    this.servicesService.searchInformationService(page, this.size, this.idContractSearch, this.nameService, this.startDateSearch, this.endDateSearch)
      .subscribe(
        data => {
          this.pageClicked = page;
          this.servicePage = data;
          this.servicesModel = this.servicePage.content;
          this.totalPages = this.servicePage.totalPages;
          this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
          if (this.servicesModel.length == 0) {
            this.messageService = "Không tìm thấy kết quả nào phù hợp";
          } else {
            this.messageService = "";
          }
        }
      );
  }

  searchNameService(value) {
    this.nameService = value;
    this.loadData(0);
  }

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

  searchMonthYearService() {
    if (this.startDateSearch >= this.endDateSearch) {
      this.message = "Nhập số năm Từ ngày nhỏ hơn Đến ngày";
      this.checkValidateInputYear = true;
    } else if (parseInt(this.startDateSearch.substring(0, 4)) < 2000) {
      this.message = "Nhập số năm Từ ngày lớn hơn 1999";
      this.checkValidateInputYear = true;
    } else if (parseInt(this.endDateSearch.substring(0, 4)) > 2024) {
      this.message = "Nhập số năm Đến ngày nhỏ hơn 2025";
      this.checkValidateInputYear = true;
    } else {
      this.message = "";
      this.checkValidateInputYear = false;
      this.loadData(0);
    }
  }

  setIdContractSearch(value) {
    for (let i = 0; i < this.dataCustomer.contracts.length; i++) {
      if (this.dataCustomer.contracts[i].ground.codeGround == value) {
        this.idContractSearch = this.dataCustomer.contracts[i].id;
        break;
      }
    }
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
}
