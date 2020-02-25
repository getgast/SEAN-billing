import { Component, OnInit } from '@angular/core';
import { WebServiceService } from 'src/app/service/web-service.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  public orderHistory;
  constructor(private http: WebServiceService) { }

  ngOnInit(): void {
    this.getOrderHistory()

  }

  getOrderHistory() {
    console.log('getOrderHistory')
    this.http.get('api/v1/all-order').subscribe(data=>{
      console.log(data)
      this.orderHistory = data['rows'];
    })
  }
}
