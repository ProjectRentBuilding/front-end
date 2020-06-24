import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import * as jQuery from 'jquery';
import 'bootstrap-notify';
import {CrudService} from './CrudService';
import {EquipmentModel} from '../model/equipment.model';
import {Observable} from 'rxjs';

let $: any = jQuery;
@Injectable({
  providedIn: 'root'
})
export class EquipmentService extends CrudService<EquipmentModel, number> {

  constructor(protected http: HttpClient) {
    super(http, 'http://localhost:8080/equipments');
  }

  // getEquipmentPage(currentPage, size, search): Observable<any> {
  //   return this._http.get<any>(`http://localhost:8080/equipments/page`, {
  //     params: {
  //       page: currentPage, size: size, search: search
  //     }
  //   });
  // }

  // getEquipmentPageSearch(currentPage, size, nameEquipmentSearch, groundIdSearch, typeEquipmentIdSearch): Observable<any> {
  //   return this._http.get<any>(`http://localhost:8080/equipments/paging`, {
  //     params: {
  //       page: currentPage,
  //       size: size,
  //       nameEquipment: nameEquipmentSearch,
  //       groundId: groundIdSearch,
  //       typeEquipmentId: typeEquipmentIdSearch
  //     }
  //   });
  // }

  getEquipmentPageSearch(currentPage, size, nameEquipmentSearch, amountSearch, codeGroundSearch, typeEquipmentSearch): Observable<any> {
    return this._http.get<any>(`http://localhost:8080/equipments/paging`, {
      params: {
        page: currentPage,
        size: size,
        nameEquipment: nameEquipmentSearch,
        amount: amountSearch,
        codeGround: codeGroundSearch,
        nameTypeEquipment: typeEquipmentSearch
      }
    });
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
}
