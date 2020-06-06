import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ContractService} from '../../../service/contract.service';

@Component({
  selector: 'app-contract-add',
  templateUrl: './contract-add.component.html',
  styleUrls: ['./contract-add.component.css']
})
export class ContractAddComponent implements OnInit {
  public currentDayValue = new Date();
  public formAddNewContract: FormGroup;
  public startDayCheck: Date;
  public endDayCheck: Date;
  public currentDay = Date.now();
  public messageTimeValidate: string;
  public termCalculate: number;
  public totalCalculate: number;
  public priceCalculate: number;
  public statusCalculate: boolean;


  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public contractService: ContractService,
  ) {
  }

  ngOnInit() {

    this.formAddNewContract = this.formBuilder.group({
      customerName: ['', [Validators.required]],
      groundName: ['', [Validators.required, Validators.pattern('^MB[0-9]{3}$')]],
      idCardCustomer: ['', [Validators.required, Validators.pattern('^(([0-9]{9})|([0-9]{12}))$')]],
      status: [''],
      term: [''],
      startRentDay: ['', [Validators.required]],
      endRentDay: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      total: [''],
      content: ['', [Validators.required]],
      unified: ['']
    });
    this.formAddNewContract.patchValue({
      unified: false
    });


  }

  addNewContract() {

    this.contractService.save(this.formAddNewContract.value).subscribe(data => {
      this.router.navigateByUrl('contracts').then(r => this.contractService.showNotification('', 'Thêm mới thành công, chúc mừng bạn'));
    });

  }

  checkValidateTimeInput(a: Date, b: Date) {

    if (a == null || b == null) {
      return 0;
    }


    if (a.getTime() <= b.getTime()) {
      this.termCalculate = parseFloat(((b.getTime() - a.getTime()) / 2629800000).toFixed(2));
      this.totalCalculate = this.termCalculate * this.priceCalculate;
      this.messageTimeValidate = '';
    } else {
      this.messageTimeValidate = 'Ngày bắt đầu phải nhỏ hơn ngày kết thúc';
    }

    this.statusCalculate = (a.getTime() <= this.currentDay) && (b.getTime() >= this.currentDay);


  }

  startDate = new Date(2020, 0, 1);


  clearFilters() {
    this.ngOnInit();
  }

  formatsDate: string[] = [
    'dd/MM/yyyy',
  ];
}
