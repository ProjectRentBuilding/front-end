import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ContractService} from "../../../service/contract.service";

@Component({
  selector: 'app-contract-edit',
  templateUrl: './contract-edit.component.html',
  styleUrls: ['./contract-edit.component.css']
})
export class ContractEditComponent implements OnInit {

  public formEditContract: FormGroup;
  public contractId;
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
    public activatedRouter: ActivatedRoute,
    public contractService: ContractService
  ) {
  }

  ngOnInit() {
    this.formEditContract = this.formBuilder.group({
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
      unified: ['', [Validators.required]]
    });

    this.activatedRouter.params.subscribe(data => {
      this.contractId = data.id;
      this.contractService.findOne(this.contractId).subscribe(data => {
        this.formEditContract.patchValue(data);
      });
    });
  }

  editContract() {
    this.contractService.update(this.formEditContract.value, this.contractId).subscribe(data => {
      this.router.navigateByUrl('contracts').then(r => this.contractService.showNotification("", "Chỉnh sửa thành công, chúc mừng bạn"));
    });

  }

  checkValidateTimeInput(a: Date, b: Date) {
    let subA;
    let subB;
    subA = new Date(a);
    subB = new Date(b);

    if (subA.getTime() <= subB.getTime()) {
      this.termCalculate = parseFloat(((subB.getTime() - subA.getTime()) / 2629800000).toFixed(2));
      this.totalCalculate = this.termCalculate * this.priceCalculate;
      this.messageTimeValidate = "";
    } else {
      this.messageTimeValidate = "Ngày bắt đầu phải nhỏ hơn ngày kết thúc";
    }

    this.statusCalculate = (subA.getTime() <= this.currentDay) && (subB.getTime() >= this.currentDay);


  }

  startDate = new Date(2020, 0, 1);


  clearFilters() {
    this.ngOnInit();
  }

}
