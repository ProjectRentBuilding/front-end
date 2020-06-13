import {CrudOperations} from './CrudOperations';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

export abstract class CrudService<T, ID> implements CrudOperations<T, ID> {
  // httpOptions: any;
  protected constructor(
    protected _http: HttpClient,
    protected _base: string
  ) {
    // this.httpOptions = {
    //   headers: new HttpHeaders({'Content-Type': 'application/json'})
    //   , 'Access-Control-Allow-Origin': 'http://localhost:4200', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    // };
  }

  save(t: T): Observable<T> {
    return this._http.post<T>(this._base, t);
  }

  update(t: T, id: ID): Observable<T> {
    return this._http.put<T>(`${this._base}/${id}`, t);
  }

  findOne(id: ID): Observable<T> {
    return this._http.get<T>(`${this._base}/${id}`);
  }

  findAll(): Observable<T[]> {
    return this._http.get<T[]>(this._base);
  }

  delete(id: ID): Observable<T> {
    return this._http.delete<T>(`${this._base}/${id}`);
  }


}
