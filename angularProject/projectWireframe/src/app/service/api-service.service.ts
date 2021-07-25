import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiServiceService {

  constructor(public http: HttpClient) { }
  
  public getUserDetails(): any {
    return this.http.get<any[]>(`./assets/stub.json`);
  }
}
