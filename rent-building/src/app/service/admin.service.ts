import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// @ts-ignore
import { TokenStorageService } from '../auth/token-storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  httpOptions: any;
  baseURL = "http://localhost:8080/api/admin/";
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ` + this.tokenStorage.getToken() })
      , 'Access-Control-Allow-Origin': 'http://localhost:4200', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }
  getAllCourse(curentPage,size,search): Observable<any> {
    return this.http.get(this.baseURL + "course"+ '?page=' + curentPage + '&size=' + size + '&search=' + search, this.httpOptions);
  }
  createCourse(course: any): Observable<any> {
    return this.http.post(this.baseURL + "course", course, this.httpOptions)
  }
  deleteCourse(id:number): Observable<any> {
    return this.http.delete(this.baseURL+"course/"+id,this.httpOptions);
  }

  getCourseById(id:number) :Observable<any> {
    return this.http.get(this.baseURL+"course/"+id,this.httpOptions);
  }

  updateCourse(course:any):Observable<any> {
    return this.http.put(this.baseURL+"course/"+course.id,course,this.httpOptions);
  }

  getAllInstructor(curentPage,size,search): Observable<any> {
    return this.http.get(this.baseURL + "instructor"+ '?page=' + curentPage + '&size=' + size + '&search=' + search, this.httpOptions);
  }

}
