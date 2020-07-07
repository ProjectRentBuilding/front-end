import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {EmployeeModel} from '../../../model/employee';
import {GroundModel} from '../../../model/ground.model';
import {ContractModel} from '../../../model/contract';
import {UserBuildingModel} from '../../../model/userBuilding.model';
import {EmployeeService} from '../../../service/employee.service';
import {MatDialog} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {GroundService} from '../../../service/ground.service';
import {ContractService} from '../../../service/contract.service';
import {UserBuildingService} from '../../../service/user-building.service';
import {EmployeeDeleteComponent} from '../employee-delete/employee-delete.component';
import {EmployeeAddComponent} from '../employee-add/employee-add.component';
import {EmployeeRegisterComponent} from '../employee-register/employee-register.component';
import {EmployeeServeDeleteComponent} from '../employee-serve-delete/employee-serve-delete.component';

@Component({
  selector: 'app-employee-serve-list',
  templateUrl: './employee-serve-list.component.html',
  styleUrls: ['./employee-serve-list.component.css']
})
export class EmployeeServeListComponent implements OnInit, OnDestroy {
  public checkEdit = false;
  public checkAdd = false;
  public flag;
  public formAddNewEmployee: FormGroup;
  public formEditEmployee: FormGroup;
  public count: number;
  startDate = new Date(1990, 0, 1);
  public size = 5;
  public employeePage: any;
  public totalPages = 1;
  public pages = [];
  pageClicked: number = 0;
  public searchText = '';
  // public page = 1;
  public search;
  public subscription: Subscription;
  public employees: EmployeeModel[] = [];
  public grounds: GroundModel[] = [];
  public contracts: ContractModel[] = [];
  public userBuildings: UserBuildingModel[] = [];
  public userName = new Array<string>();
  message = '';
  totalRec: number;
  public employeeOfId;
  public employee: FormArray;
  public getarray = 1;
  public checkPage = 0;
  public userBuilding: UserBuildingModel;
  public nameEmployeeSearch = '';
  public idCardSearch = '';
  public addressSearch = '';
  public partSearch = '';
  public formSearch: FormGroup;

  public arraySentUsernameList: [] = [];

  constructor(public employeeService: EmployeeService,
              public dialog: MatDialog,
              public formBuilder: FormBuilder,
              public router: Router,
              public activateRouter: ActivatedRoute,
              public groundService: GroundService,
              public contractService: ContractService,
              public userBuildingService: UserBuildingService,
  ) {
    this.formAddNewEmployee = this.formBuilder.group({
      employee: this.formBuilder.array([this.createEmployee()])
    });
  }

  loadData(page) {
    this.employeeService.getEmployeePageSearch1(page, this.size, this.nameEmployeeSearch, this.idCardSearch, this.addressSearch, this.partSearch)
      .subscribe(
        data => {
          // console.log(this.size);
          this.pageClicked = page;
          this.employeePage = data;
          this.employees = this.employeePage.content;
          this.totalPages = this.employeePage.totalPages;
          this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
        }, () => {

        }, () => {
          if (this.employees.length === 0) {
            this.message = 'Không tìm thấy kết quả nào phù hợp!!!';
          } else {
            this.message = '';
          }
        }
      );
  }

  createEmployee(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.pattern('^[a-zA-ZÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶÉÈẺẼẸÊẾỀỂỄỆIÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰYÝỲỶỸỴĐáàảãạâấầẩẫậăắằẳẵặéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợuúùủũụưứừửữựýỳỷỹỵđ ]{1,40}$'), Validators.minLength(4), Validators.maxLength(30)]],
      idCard: ['', [Validators.required, Validators.pattern('^[0-9]{9,10}$')]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0][1-9]{9}$')]],
      birthday: ['', Validators.required],
      address: ['', Validators.required],
      gender: ['', Validators.required],
      levelSalary: ['', Validators.required],
      salary: ['', [Validators.required]],
      part: ['', Validators.required],
      startWord: ['', Validators.required],
      userBuilding: [''],
      typeEmployee: ['']
    });
  }


  ngOnInit() {
    this.formSearch = this.formBuilder.group({
      nameEmployeeSearch: [''],
      idCardSearch: [''],
      addressSearch: [''],
      partSearch: ['']
    });

    this.formEditEmployee = this.createEmployee();
    this.loadData(0);
    this.groundService.findAll().subscribe(data => {
      this.grounds = data;
    });
    this.contractService.findAll().subscribe(data => {
      this.contracts = data;
    });
    this.loadDataUserBuildings();

  }

  loadDataUserBuildings() {
    this.userBuildingService.findAll().subscribe(data => {
      this.userBuildings = data;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.userBuildings.length; i++) {
        // @ts-ignore
        if (this.userBuildings[i].employee == null) {
          continue;
        } else {
          // @ts-ignore
          if (this.userBuildings.indexOf(this.userBuildings[i] === -1)) {
            // @ts-ignore
            this.userName.push(this.userBuildings[i]);
          }
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  openDialogDelete(employeeId): void {
    this.employeeService.findOne(employeeId).subscribe(dataOfEmployee => {
      const dialogRef = this.dialog.open(EmployeeServeDeleteComponent, {
        width: '500px',
        height: '250px',
        data: {data1: dataOfEmployee},
        disableClose: false,
      });

      dialogRef.afterClosed().subscribe(result => {
        // this.ngOnInit();
      });
    });

  }

  openDialogAdd(): void {
    const dialogRef = this.dialog.open(EmployeeAddComponent, {
      width: '40%',
      height: '80%',
      disableClose: false,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  openDialogRegister(): void {
    const dialogRef = this.dialog.open(EmployeeRegisterComponent, {
      width: '500px',
      height: '320px',
      disableClose: false,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadData(this.checkPage);
    });
  }

  addNewEmployee() {
    this.employee = this.formAddNewEmployee.get('employee') as FormArray;
    for (let tem = 0; tem < this.getarray; tem++) {
      // this.employees.push(this.employee.at(tem).value);
      // this.userBuildingService.findOne(this.employeeService.sentUsername).subscribe(data => {
      //   this.userBuilding = data;
      // });
      // this.userBuildings.push(this.userBuilding);
      console.log(this.employee.at(tem).value);
      // this.formAddNewEmployee.value.typeEmployee = 0;
      this.employee.at(tem).value.typeEmployee = 1;
      console.log(this.employee.at(tem).value);
      this.employeeService.save(this.employee.at(tem).value).subscribe(data => {
        if (tem === (this.getarray - 1)) {
          this.employee.reset();
          // this.onLast();
        }
      });
    }
    console.log(this.userName.length);
    // this.loadDataUserBuildings();
    // this.ngOnInit();
    // this.redirectTo('employees');
    // console.log(this.formAddNewEmployee.value);
    // this.ngOnInit();
    this.employeeService.showNotification('', 'Thêm mới thành công, chúc mừng bạn');
    this.checkAdd = false;
    // this.cancelAdd();

    this.employeeService.arraySentUsername = [];
    this.cancelAdd();
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }

  checkEditEmployee(id) {
    if (!this.checkEdit) {
      this.checkEdit = !this.checkEdit;
      this.checkAdd = false;
      this.flag = id;
      this.employeeOfId = id;
      this.employeeService.findOne(this.employeeOfId).subscribe(data => {
        this.formEditEmployee.patchValue(data);
      });
    }
  }

  editEmployee() {
    console.log(this.formEditEmployee.value);
    this.employeeService.update(this.formEditEmployee.value, this.employeeOfId).subscribe(data => {
      this.checkEdit = false;
      this.flag = null;
      // this.employeeService.findAll().subscribe(data => {
      //   this.employees = data;
      //   // this.totalRec = this.employees.l      ength;
      // });
      this.loadData(this.checkPage);
      this.employeeService.showNotification('', 'Chỉnh sửa thành công  !!!');
    });
  }

  checkPages(page) {
    this.checkPage = page;
  }

  resetEmployee(employeeOfId) {
    this.employeeService.findOne(employeeOfId).subscribe(data => {
      this.formEditEmployee.patchValue(data);
    });
    console.log(employeeOfId);
  }

  cancelAdd() {
    this.redirectTo('employees/paging1');
  }

//   deleteAll() {
//     for(let item=0;item <this.grounds.length;item++)
//       this.groundService.delete(this.grounds[item].id).subscribe(data => {
//       });
//     this.redirectTo('grounds');
//     this.groundService.showNotification('', 'Xoá tất cả thành công, chúc mừng bạn');
//   }
// }
  deleteAll() {
    // tslint:disable-next-line:prefer-for-of
    this.employeeService.findAll().subscribe(data1 => {
      this.employees = data1;
      // console.log(this.employees);
      for (let item = 0; item < this.employees.length; item++) {
        this.employeeService.delete(this.employees[item].id).subscribe(data => {
        });
        this.redirectTo('employees/paging1');
      }
      this.employeeService.showNotification('', 'Xoá thành công, chúc mừng bạn !!!');
      // this.totalRec = this.employees.length;
    });
  }

  logValue() {
    // console.log(this.formAddNewEmployee.value);

  }

  get employeeControls() {
    return this.formAddNewEmployee.get('employee')['controls'];
  }

  addNewArray(): void {
    if (!this.checkAdd) {
      this.checkAdd = !this.checkAdd;
    } else {
      this.getarray++;
      this.employee = this.formAddNewEmployee.get('employee') as FormArray;
      this.employee.push(this.createEmployee());
    }
  }

  // addNewArray(): void {
  //   if (!this.checkAdd) {
  //     this.checkAdd = !this.checkAdd;
  //   } else {
  //     this.getarray++;
  //     this.subscription = this.typeElementService.findAll().subscribe((data: TypeEquipmentModel[]) => {
  //       this.typeEquipment = data;
  //     });
  //     this.equipment = this.formAddNewEquipment.get('equipment') as FormArray;
  //     this.equipment.push(this.createEquipment());
  //   }
  // }

  removeAddress(i: number) {
    if (i === 0) {
      this.checkAdd = false;
    }
    this.employee.removeAt(i);
  }


  onNext() {
    if (this.pageClicked === this.totalPages - 1) {
    } else {
      this.pageClicked++;
    }
    this.loadData(this.pageClicked);
  }

  onPrevious() {
    if (this.pageClicked === 0) {
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

  refreshForm() {
    this.searchText = '';
  }

  onSearch(page) {
    this.nameEmployeeSearch = this.formSearch.value.nameEmployeeSearch;
    this.idCardSearch = this.formSearch.value.idCardSearch;
    this.addressSearch = this.formSearch.value.addressSearch;
    this.partSearch = this.formSearch.value.partSearch;
    this.employeeService.getEmployeePageSearch1(page, this.size, this.nameEmployeeSearch, this.idCardSearch, this.addressSearch, this.partSearch)
      .subscribe(
        data => {
          this.pageClicked = page;
          this.employeePage = data;
          this.contracts = this.employeePage.content;
          this.totalPages = this.employeePage.totalPages;
          this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
          console.log(data);
        }, () => {

        }, () => {
          if (this.employees.length === 0) {
            this.message = 'Không tìm thấy kết quả nào phù hợp.';
          } else {
            this.message = '';
          }
        }
      );
    this.loadData(page);

  }

}
