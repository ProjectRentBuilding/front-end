import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CrudService} from "./CrudService";
import {ImageModel} from "../model/image.model";
import { TypeGroundModel } from '../model/typeGround.model';

@Injectable({
  providedIn: 'root'
})
export class TypeGroundService extends CrudService<TypeGroundModel,number> {

  constructor(protected  http: HttpClient) {
    super(http, 'http://localhost:8080/typeGrounds');
  }
}
