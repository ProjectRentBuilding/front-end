import { Injectable } from '@angular/core';
import {CrudService} from "./CrudService";
import {EmployeeModel} from "../model/employee";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends CrudService<EmployeeModel,number>{

  constructor(protected http: HttpClient) {
    super(http, 'http://localhost:8080/employees');
  }
}
