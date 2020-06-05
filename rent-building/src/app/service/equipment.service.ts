import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  public API = 'http://localhost:3000/equipment';
  constructor(
    public http: HttpClient
  ) { }
  getAllEquipment(): Observable<any> {
    return this.http.get(this.API);
  }

  addNewEquipment(equipment): Observable<any> {
    return this.http.post(this.API, equipment);
  }

  getEquipmentById(equipmentId): Observable<any> {
    return this.http.get(this.API + '/' + equipmentId);
  }

  deleteEquipment(equipmentId): Observable<any> {
    return this.http.delete(this.API + '/' + equipmentId);
  }

  editEquipment(equipment, equipmentId): Observable<any> {
    return this.http.put(this.API + '/' + equipmentId, equipment);
  }
}
