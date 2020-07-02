import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Customer} from '../../../model/customer.model';
import {ContractModel} from '../../../model/contract';
import {GroundModel} from '../../../model/ground.model';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {CustomerService} from '../../../service/customer.service';
import {Router} from '@angular/router';
import {GroundService} from '../../../service/ground.service';
import {ContractService} from '../../../service/contract.service';
import {UserBuildingService} from '../../../service/user-building.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmployeeService} from '../../../service/employee.service';

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.css']
})
export class EmployeeRegisterComponent implements OnInit, OnDestroy {
  public subscription: Subscription;
  addUserBuildingForm: FormGroup;
  public arrayUserBuilding = [];
  public nameUserBuildings = [];
  public messageUserCheck = '';
  public checkValidateUserName: boolean;


  constructor(
    public dialogRef: MatDialogRef<EmployeeRegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public routerService: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    public userBuildingService: UserBuildingService,
    public employeeService: EmployeeService
  ) {
  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('passwordUser').value !== c.get('passwordAgain').value) {
      return {invalid: true};
    }
  }

  ngOnInit() {

    return this.addUserBuildingForm = this.fb.group({
      username: ['', Validators.required],
      passwordUser: ['', Validators.required],
      passwordAgain: ['', Validators.required]
    }, {validator: this.passwordConfirming});
  }

  // onAddUserBuilding() {
  //   this.userBuildingService.save(this.addUserBuildingForm.value).subscribe(data => {
  //     this.userBuildingService.showNotification('', 'Thêm tài khoản thành công, chúc mừng bạn');
  //     // if (data && data.id) {
  //     // this.routerService.navigate(['customers']).then(r => this.afterOnAddBuilding());
  //     // }
  //
  //   });
  // }


  onAddUserBuilding() {


    this.userBuildingService.save(this.addUserBuildingForm.value).subscribe(data => {
      this.afterAddUserBuilding();
    });
  }

  afterAddUserBuilding() {
    this.userBuildingService.showNotification('', 'Thêm tài khoản thành công, chúc mừng bạn');
    console.log(this.addUserBuildingForm.value.username);
    this.employeeService.sentUsername = this.addUserBuildingForm.value.username;
    this.employeeService.arraySentUsername.push(this.addUserBuildingForm.value.username);

  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  checkUserName() {

    this.messageUserCheck = '';
    this.checkValidateUserName = false;
    this.userBuildingService.findAll().subscribe(data => {
        this.arrayUserBuilding = data;
      }, () => {
        console.log('Error in subscribe');
      }, () => {
        for (let i = 0; i < this.arrayUserBuilding.length; i++) {
          this.nameUserBuildings.push(this.arrayUserBuilding[i].username);
        }
        console.log(this.nameUserBuildings);
        for (let i = 0; i < this.nameUserBuildings.length; i++) {
          if (this.addUserBuildingForm.value.username === (this.nameUserBuildings[i])) {
            this.messageUserCheck = 'Tên đăng nhập đã tồn tại';
            this.checkValidateUserName = true;
            // this.addUserBuildingForm.setErrors({'invalid': false});
          }
        }
      }
    );
  }
}


// export class CustomerDetailGroundComponent implements OnInit, OnDestroy {
//   public customerOfName;
//   public customerOfId;
//   public customerGrounds = new Array<string>();
//   public customerStatusContract = new Array<string>();
//
//   public customers: Customer[];
//   public contracts: ContractModel[] = [];
//   public grounds: GroundModel[];
//
//   constructor(
//     public dialogRef: MatDialogRef<CustomerDetailGroundComponent>,
//     public customerService: CustomerService,
//     public routerService: Router,
//     public dialog: MatDialog,
//     public groundService: GroundService,
//     public contractService: ContractService,
//     @Inject(MAT_DIALOG_DATA) public data: any,
//   ) {
//   }
//
//   ngOnInit() {
//     // alert(this.data.data1.name.contracts.ground.codeGround);
//     this.customerOfId = this.data.data1.id;
//     this.customerOfName = this.data.data1.name;
//
//     // tslint:disable-next-line:prefer-for-of
//     for (let i = 0; i < this.data.data1.contracts.length; i++) {
//       this.customerGrounds.push(this.data.data1.contracts[i].ground.codeGround);
//       this.customerStatusContract.push(this.data.data1.contracts[i].statusContract);
//       // console.log(this.customerGrounds);
//     }
//
//     // console.log(this.data.data1);
//     console.log(this.data.data1.contracts);
//   }
//
//   ngOnDestroy() {
//     if (this.subscription) {
//       this.subscription.unsubscribe();
//     }
//   }
// }
