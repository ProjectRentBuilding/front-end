import {Injectable} from '@angular/core';
import {CrudService} from './CrudService';
import {HttpClient} from '@angular/common/http';
import {TypeFloorModel} from '../model/typeFloor.model';

@Injectable({
  providedIn: 'root'
})
export class TypeFloorService extends CrudService<TypeFloorModel, number> {

  constructor(protected  http: HttpClient) {
    super(http, 'http://localhost:8080/typeFloors');
  }
}
