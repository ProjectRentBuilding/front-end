import {Injectable} from '@angular/core';
import {CrudService} from './CrudService';
import {Customer} from '../model/customer.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends CrudService<Customer, number> {

  constructor(protected http: HttpClient) {
    super(http, 'http://localhost:3000/customers');
  }
}
