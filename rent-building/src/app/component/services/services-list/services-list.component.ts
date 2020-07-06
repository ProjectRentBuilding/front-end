import {Component, OnDestroy, OnInit} from '@angular/core';
import {ServicesModel} from "../../../model/services.model";
import {MatDialog} from "@angular/material/dialog";
import {ServicesService} from "../../../service/services.service";
import {Subscription} from "rxjs";
import {ServicesAddComponent} from "../services-add/services-add.component";
import {ServicesDeleteComponent} from "../services-delete/services-delete.component";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ContractService} from "../../../service/contract.service";
import {ContractModel} from "../../../model/contract";
import {Router} from "@angular/router";



@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.css']
})
export class ServicesListComponent implements OnInit, OnDestroy {
  public servicesModel: ServicesModel [] = [];
  public services: ServicesModel [] = [];
  public subscription: Subscription;
  private searchForm: FormGroup;
  public addServiceForm: FormGroup;
  public editServiceForm: FormGroup;
  private contracts;
  private indexBeforeMonth = 0;
  private consume = 0;
  private indexAfterMonth = 0;
  public flag = -1;
  public checkEdit = false;
  public checkAdd = false;
  public serviceOfId;
  public getArray = 1;
  public servicesDistinct;

  public service: FormArray;

  public page = 1;
  public size = 5;
  public servicePage: any;
  public totalPages: number = 1;
  public pages = [];
  pageClicked: number = 0;
  startDate = new Date(2000, 1, 1);

  public searchNameService = "";
  public searchPeriodic = "";
  public searchConsume = 0;
  public searchMonthYear = "2000-01-01";
  public message = "";
  public resultMonthYear;


  constructor(
    private servicesService: ServicesService,
    private dialog: MatDialog,
    private contractService: ContractService,
    public routerService: Router,
    private fb: FormBuilder
  ) {
    this.addServiceForm = this.fb.group({
      service: this.fb.array([this.createService()])
    });
  }

  ngOnInit() {
    this.servicesService.getServiceDistinct().subscribe((data: string[]) => {
      this.servicesDistinct = data;
    });
    this.servicesService.findAll().subscribe((data: ServicesModel[]) => {
      this.servicesModel = data;
    });
    this.contractService.findAll().subscribe((data: ContractModel[]) => {
      this.contracts = data;
    });
    this.searchForm = this.fb.group({
      searchNameService: [''],
      searchPeriodic: [''],
      searchConsume: [''],
      searchMonthYear: ['']
    });
    this.editServiceForm = this.createService();
    this.loadData(0);
  }

  public loadData(page) {
    this.servicesService.getServicePageSearch(page, this.size, this.searchNameService, this.searchPeriodic, this.searchConsume, this.searchMonthYear)
      .subscribe(
        data => {
          this.pageClicked = page;
          this.servicePage = data;
          this.services = this.servicePage.content;
          this.totalPages = this.servicePage.totalPages;
          this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
          if (this.services.length == 0) {
            this.message = "Không tìm thấy kết quả nào phù hợp";
          } else {
            this.message = "";
          }
        }
      );
  }
  openDialogAddNew(): void {
    const dialogRef = this.dialog.open(ServicesAddComponent, {
      width: '65%',
      height: '80%',
      disableClose: false,

    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      this.loadData(this.pageClicked);
    });
  }

  openDialogDelete(id): void {
    this.servicesService.findOne(id).subscribe(dataOfServiceModel => {
      const dialogRef = this.dialog.open(ServicesDeleteComponent, {
        width: '35%',
        data: {data1: dataOfServiceModel},
        disableClose: false,
      });
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
        this.loadData(this.pageClicked);
      });
    });
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

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSearch(page) {
    if (this.searchForm.value.searchNameService == null) {
      this.searchForm.value.searchNameService = "";
      this.searchNameService = this.searchForm.value.searchNameService;
    } else {
      this.searchNameService = this.searchForm.value.searchNameService;
    }
    if (this.searchForm.value.searchPeriodic == null) {
      this.searchForm.value.searchPeriodic = "";
      this.searchPeriodic = this.searchForm.value.searchPeriodic;
    } else {
      this.searchPeriodic = this.searchForm.value.searchPeriodic;
    }
    if (this.searchForm.value.searchConsume == null || this.searchForm.value.searchConsume == "") {
      this.searchForm.value.searchConsume = 0;
      this.searchConsume = this.searchForm.value.searchConsume;
    } else {
      this.searchConsume = this.searchForm.value.searchConsume;
    }

    if (this.searchForm.value.searchMonthYear == null) {
      this.searchForm.value.searchMonthYear = "";
      this.searchMonthYear = this.searchForm.value.searchMonthYear;
    } else {
      this.searchMonthYear = this.searchForm.value.searchMonthYear;
      let monthYear = new Date(this.searchMonthYear);
      if (isNaN(monthYear.getFullYear())) {
        this.resultMonthYear = "2000-01-01";
      } else {
        this.resultMonthYear = "" + monthYear.getFullYear() + "-" + (monthYear.getMonth() + 1) + "-" + monthYear.getDay();
      }
      this.searchMonthYear = this.resultMonthYear;
      this.loadData(page);
    }
  }

  resetForm() {
    this.searchForm.reset();
    this.searchForm.value.searchMonthYear = "";
    this.onSearch(0);
  }

  public createService(): FormGroup {
    return this.fb.group({
      nameService: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(25),
        Validators.pattern('^[a-zA-ZÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶÉÈẺẼẸÊẾỀỂỄỆIÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰYÝỲỶỸỴĐáàảãạâấầẩẫậăắằẳẵặéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợuúùủũụưứừửữựýỳỷỹỵđ ]+$')]],
      periodic: ['', [Validators.required]],
      unit: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25),
        Validators.pattern('^[a-zA-ZÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶÉÈẺẼẸÊẾỀỂỄỆIÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰYÝỲỶỸỴĐáàảãạâấầẩẫậăắằẳẵặéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợuúùủũụưứừửữựýỳỷỹỵđ/³ ]+$')]],
      price: ['', [Validators.required, Validators.min(3000), Validators.max(300000)]],
      indexBeforeMonth: ['', [Validators.required, Validators.min(10000), Validators.max(9000000)]],
      indexAfterMonth: ['', [Validators.required, Validators.min(10000), Validators.max(9000000)]],
      consume: ['', [Validators.required, Validators.min(10000), Validators.max(3000000)]],
      monthYear: ['', [Validators.required]],
      contractId: ['', [Validators.required]],
      id: [''],
    });
  }

  checkEditService(id) {
    if (!this.checkEdit) {
      this.checkEdit = !this.checkEdit;
      this.flag = id;
      this.serviceOfId = id;
      this.servicesService.findOne(this.serviceOfId).subscribe(data => {
        this.editServiceForm.patchValue(data);
      });
    }
    if (this.flag > 0) {
      this.flag = id;
      this.serviceOfId = id;
      this.servicesService.findOne(this.serviceOfId).subscribe(data => {
        this.editServiceForm.patchValue(data);
      });
    }
  }

  redirectTo(uri: string) {
    this.routerService.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.routerService.navigate([uri]));
  }

  close() {
    this.redirectTo('services');
  }

  editService() {
    this.servicesService.update(this.editServiceForm.value, this.serviceOfId).subscribe(data => {
      this.servicesService.showNotification('', 'Sửa thành công, chúc mừng bạn');
      this.flag = -1;
      this.checkEdit = false;
      this.loadData(this.pageClicked);
    });
  }

  removeService(i) {
    if (this.getArray == 1) {
      this.checkAdd = false;
      this.addServiceForm = this.fb.group({
        service: this.fb.array([this.createService()])
      });
    } else {
      this.service.removeAt(i);
    }
  }

  addNewArray() {
    if (!this.checkAdd) {
      this.checkAdd = !this.checkAdd;
    } else {
      this.getArray++;
      this.service = this.addServiceForm.get('service') as FormArray;
      this.service.push(this.createService());
    }
  }

  addNewService() {
    this.service = this.addServiceForm.get('service') as FormArray;
    for (let tem = 0; tem < this.getArray; tem++) {
      this.servicesService.save(this.service.at(tem).value).subscribe(data => {
        this.servicesService.showNotification('', 'Thêm mới thành công, chúc mừng bạn');
        if (tem === (this.getArray - 1)) {
          this.service.reset();
          this.onLast();
        }
      });
    }
    // this.redirectTo('services');
  }

  get serviceControls() {
    return this.addServiceForm.get('service')['controls'];
  }

  checkIndexBeforeMonth(indexBeforeMonth) {
    this.indexBeforeMonth = parseInt(indexBeforeMonth);
    this.indexAfterMonth = this.indexBeforeMonth + this.consume;
  }

  checkConsume(consume) {
    this.consume = parseInt(consume);
    this.indexAfterMonth = this.indexBeforeMonth + this.consume;
  }


  openInformationCustomer(id,monthYear) {
    this.routerService.navigate(['information_customer',id,monthYear]);
  }


}
