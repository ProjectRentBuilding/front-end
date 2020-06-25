import { Injectable } from '@angular/core';
import {CrudService} from "./CrudService";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ReportModel} from "../model/report.model";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(protected _http: HttpClient) { }

  getAllReport(): Observable<any> {
    return this._http.get<ReportModel[]>(`http://localhost:8080/reports/all`);
  }
  getAllReportHigh(): Observable<any> {
    return this._http.get<ReportModel[]>(`http://localhost:8080/reports/high`);
  }
  getAllReportLow(): Observable<any> {
    return this._http.get<ReportModel[]>(`http://localhost:8080/reports/low`);
  }
  getAllReportAndSearchAll(startRentDay, endRentDay, minTotal, maxTotal, codeGround): Observable<any> {
    return this._http.get<any>(`http://localhost:8080/reports/search`, {
      params: {
        startRentDay: startRentDay,
        endRentDay: endRentDay,
        minTotal: minTotal,
        maxTotal: maxTotal,
        codeGround: codeGround
      }
    });
  }
}
