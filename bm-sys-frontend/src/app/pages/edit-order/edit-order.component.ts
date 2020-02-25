import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebServiceService } from 'src/app/service/web-service.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {
  public id: string;
  public orderData;

  constructor(private route: ActivatedRoute, private http: WebServiceService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    console.log(this.id)
    if(this.id) {
      this.getOrderData(this.id)
    }
    }

  getOrderData(id) {
    this.http.get(`api/v1/order/${id}`).subscribe(data=>{
      console.log(data)
      this.orderData = data;
    })
  }

}
