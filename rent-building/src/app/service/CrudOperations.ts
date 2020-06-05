import {Observable} from 'rxjs';


export interface CrudOperations<T, ID> {
  save(t: T): Observable<T>;

  update(t: T, id: ID): Observable<T>;

  findOne(id: ID): Observable<T>;

  findAll(): Observable<T[]>;

  delete(id: ID): Observable<any>;
}
