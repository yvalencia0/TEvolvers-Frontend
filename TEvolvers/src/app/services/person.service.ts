import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private _http:HttpClient) {}

  addPerson(data:any): Observable<any>{
    //return this._http.post('http://localhost:3000/api', data);
    return this._http.post('https://localhost:44348/api/People', data);
  }

  updatePerson(id:number, data:any): Observable<any>{
    //return this._http.put(`http://localhost:3000/api/${id}`, data);
    return this._http.put(`https://localhost:44348/api/People/${id}`, data);
  }

  getPeoplePage(page:number): Observable<any>{
    //return this._http.get('http://localhost:3000/api');
    return this._http.get(`https://localhost:44348/api/People/${page}`);
  }
  getPeopleList(): Observable<any>{
    //return this._http.get('http://localhost:3000/api');
    return this._http.get('https://localhost:44348/api/People');
  }

  deletePerson(id: number): Observable<any>{
    //return this._http.delete(`http://localhost:3000/api/${id}`);
    return this._http.delete(`https://localhost:44348/api/People/${id}`);
  }
}
