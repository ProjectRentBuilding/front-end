import { Injectable } from '@angular/core';
import {CrudService} from './CrudService';
import {HttpClient} from '@angular/common/http';
import * as jQuery from 'jquery';
import 'bootstrap-notify';
import {FloorModel} from '../model/floor.model';
import {Observable} from "rxjs";


let $: any = jQuery;

@Injectable({
  providedIn: 'root'
})
export class FloorService extends CrudService<FloorModel, number> {
  constructor(protected  http: HttpClient) {
    super(http, 'http://localhost:8080/floors');
  }
  showNotification(title, message) {
    const type = ['', 'info', 'success', 'warning', 'danger'];
    const color = Math.floor((Math.random() * 4) + 1);
    $.notify({
      icon: 'notifications',
      title: title,
      message: message,
    }, {
      type: type[color],
      timer: 1500,
      placement: {
        from: 'top',
        align: 'right'
      },
      template:
        '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">notifications</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }
  getFloorPageSearch(currentPage, size, nameBuildingSearch, nameFloorSearch, areaSearch, nameTypeFloorSearch): Observable<any> {
    return this._http.get<any>(`http://localhost:8080/floors/paging`, {
      params: {
        page: currentPage,
        size: size,
        nameBuilding: nameBuildingSearch,
        nameFloor: nameFloorSearch,
        area: areaSearch,
        nameTypeFloor: nameTypeFloorSearch
      }
    });
  }
}

