import { Component, OnInit } from '@angular/core';
import { WebServiceService } from 'src/app/service/web-service.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  public productList = [];
  constructor(private http: WebServiceService) { }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.http.get('api/v1/product-list').subscribe(data=>{
      console.log(data)
      this.productList = data['rows'];
    })
  }

}
