import { Injectable } from '@angular/core';
import {CrudService} from './CrudService';
import {HttpClient} from '@angular/common/http';
import {TypeEquipmentModel} from '../model/typeEquipment.model';



@Injectable({
  providedIn: 'root'
})
export class TypeEquipmentService  extends CrudService<TypeEquipmentModel, number> {

  constructor(protected http: HttpClient) {
    super(http, 'http://localhost:8080/type_equipment');
  }

}
