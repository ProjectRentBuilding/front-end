import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {ContractModel} from "../../../model/contract";
import {ContractService} from "../../../service/contract.service";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-contract-detail',
  templateUrl: './contract-detail.component.html',
  styleUrls: ['./contract-detail.component.css']
})
export class ContractDetailComponent implements OnInit {

  public subscription: Subscription;
  public contract: ContractModel;
  public contractID: number;
  public formDetailContract: FormGroup;

  constructor(
    public contractService: ContractService,
    public router: Router,
    public activateRouter: ActivatedRoute
  ) {
    this.contractID = this.activateRouter.snapshot.params.id;
  }

  ngOnInit() {
    this.contractService.findOne(this.contractID).subscribe(data => {
      this.contract = data;
    });

  }
  formatsDate: string[] = [
    'dd/MM/yyyy',
  ];

}
