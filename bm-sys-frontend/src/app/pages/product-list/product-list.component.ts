import { Component, OnInit } from '@angular/core';
import { WebServiceService } from 'src/app/service/web-service.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  public productList = [];
  public promoProductMap = {};
  public clientList = {};
  public mapForTable = {};
  constructor(private http: WebServiceService) { }

  ngOnInit(): void {
    this.getProductList();
    this.getAllPropoProductMap();
    this.getAllClients();
  }

  getProductList() {
    this.http.get('api/v1/product-list').subscribe(data=>{
      this.productList = data['rows'];
    }, err=>{
      console.log(err)
    }, ()=>{
      this.generateMap()
    })
  }

  getAllPropoProductMap(){
    this.http.get('api/v1/all-product-promo').subscribe(data=>{
      this.promoProductMap = data;
    })
  }

  getAllClients() {
    this.http.get('api/v1/all-clients').subscribe(data=>{
      console.log(data)
      this.clientList = data['rows'];
    },
    err=>{
      console.log(err)
    },
    ()=>{
      this.generateMap()
    })
  }

  generateMap(){
    const productMap = this.generateProductMap(this.productList)
    const productWithClientMap = this.generateProductClientMap(productMap)
    console.log(productWithClientMap)
  }

  generateProductMap(arry) {
    return arry.reduce((map, item) =>{
      if (!map[item.product_id]) {
        map[item.product_id] = [item]
      } else {
        map[item.product_id].push(item)
      }

      return map;
    },{})
  }

  generateProductClientMap(map) {
    const mapKeys = Object.keys(map);

    mapKeys.forEach(item=>{
      map[item].push(this.clientList)
    })

    return map;
  }

}
