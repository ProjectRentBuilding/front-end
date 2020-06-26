import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {FormGroup} from '@angular/forms';
import {GroundModel} from '../../../model/ground.model';
import {FloorModel} from '../../../model/floor.model';
import {FloorService} from '../../../service/floor.service';
import {GroundService} from '../../../service/ground.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-services-customer',
  templateUrl: './services-customer.component.html',
  styleUrls: ['./services-customer.component.css']
})
export class ServicesCustomerComponent implements OnInit {
  constructor(
    public floorService: FloorService,
    private groundService: GroundService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }
  public subscription: Subscription;
  viewServiceForm: FormGroup;
  public id: number;
  public grounds: GroundModel[] = [];
  public floors: FloorModel[] = [];
  // @ts-ignore
  public month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] ;
  public years = new Array<string>();
  public temp: number;
  public dateNow: Date = new Date();

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      console.log(paramMap.get('id'));
    });
    this.subscription = this.floorService.findAll().subscribe((data: FloorModel[]) => {
      this.floors = data;
    });
    this.groundService.findAll().subscribe((data: GroundModel[]) => {
      this.grounds = data;
    });
    for (let i = 0; i <= 5; i++) {
      this.temp = this.dateNow.getFullYear();
      this.years.push( String(this.temp - i));
    }
    // console.log(this.dateNow);
  }
}
