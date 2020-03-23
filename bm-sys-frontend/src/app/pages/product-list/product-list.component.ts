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
  public clientList = []
  public mapForTable = {};
  public testMapForTable = {};
  public productMap = {};
  public testviewForTable = {};
  public testPromoMap = {};
  public showProductTable = false;

  public displayedColumns: string[] = [
    "productName",
    "defaultProductPrice"
  ];


  constructor(private http: WebServiceService) { }

  ngOnInit(): void {
    this.getProductList();
    this.getAllPropoProductMap();
    this.getAllClients();

  }

  addToTableList(){
    this.clientList.forEach(element => {
      console.log(element)
      this.displayedColumns.push(element.id)
    });
  }

  getProductList() {
    this.http.get('api/v1/product-list').subscribe(data=>{
      this.productList = data['rows'];
    }, err=>{
      console.log(err)
    }, ()=>{
      this.generateMap()

      // testopt
      this.testProductMap( this.productList);
    })
  }

  getAllPropoProductMap(){
    this.http.get('api/v1/all-product-promo').subscribe(data=>{
      this.promoProductMap = data;
      console.log( this.promoProductMap)
    }, err=>{
      console.log(err)
    },
    ()=>{
      this.generateMapFromPromoProductMapChild(this.promoProductMap)
    })
  }

  generateMapFromPromoProductMapChild(mapKeys){
    const objKeys = Object.keys(mapKeys);
    let buildObj = {};
    console.log(objKeys)
    buildObj = objKeys.reduce((map, item)=>{
      map[item] = this.mapiItem(this.promoProductMap[item])

      return map;
    }, {})

    console.log(buildObj)
    this.testPromoMap = buildObj
  }

  mapiItem(list){
    return list.reduce((map, item)=>{

      if (!map[item.clientid]) {
        map[item.clientid] = [item]
      } else {
        map[item.clientid].push(item)
      }

      return map;
    },{})
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
      this.addToTableList();
      this.showProductTable = true;
    })
  }

  generateMap(){
    const productMap = this.generateProductMap(this.productList)
    const productWithClientMap = this.generateProductClientMap(productMap)
    console.log(productWithClientMap)
    this.testviewForTable = productWithClientMap;
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

  testProductMap(list) {
    this.testMapForTable = list.reduce((obj, element) => {
      if (!obj[element.product_id]) {
        obj[element.product_id] = element;
      } else {
        obj[element.product_id].push(element)
      }
      return obj;
    }, {});

    console.log(this.testMapForTable)
  }

  generateProductClientMap(map) {
    const mapKeys = Object.keys(map);

    mapKeys.forEach(item=>{
      map[item].push(this.clientList)
    })

    return map;
  }

}
