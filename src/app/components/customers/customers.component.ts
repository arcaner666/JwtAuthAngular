import { CustomerService } from './../../services/customer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers: string[] = [];

  constructor(
    public customerService: CustomerService
  ) { }

  ngOnInit(): void {

  }

  getCustomersForUser() {
    this.customerService.getCustomersForUser().subscribe((response) => {
      console.log(response);
      this.customers = response;
    }, err => {
      console.log(err);
    });
  }

  getCustomersForAdmin() {
    this.customerService.getCustomersForAdmin().subscribe((response) => {
      console.log(response);
      this.customers = response;
    }, err => {
      console.log(err);
    });
  }

}
