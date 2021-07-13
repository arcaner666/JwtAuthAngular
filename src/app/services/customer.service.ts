import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  public readonly apiUrl = "https://localhost:44311/api/customer/";

  constructor(
    private http: HttpClient,
  ) { }

  getCustomers(): Observable<string[]> {
    let token: string = localStorage.getItem("jwt");
    return this.http.get<string[]>(this.apiUrl, {
      headers: new HttpHeaders(
        { "Authorization": "Bearer " + token }
      )
    });
  }
}
