import { Injectable } from '@angular/core';
import {CrudService} from './CrudService';
import {HttpClient} from '@angular/common/http';
import {ImageModel} from '../model/image.model';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImageService extends CrudService<ImageModel,number> {

  constructor(protected  http: HttpClient) {
    super(http, 'http://localhost:8080/images');
  }
  findByTypeContaining(type:string): Observable<ImageModel[]> {
    return this._http.get<ImageModel[]>(`${this._base}/${type}`);
  }
}
