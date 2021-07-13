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

  getCustomersForUser(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl + "getcustomersforuser");
  }

  getCustomersForAdmin(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl + "getcustomersforadmin");
  }
}
