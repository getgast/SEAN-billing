import { Component, OnInit } from '@angular/core';
import { WebServiceService } from 'src/app/service/web-service.service';

@Component({
  selector: 'app-ordered-items',
  templateUrl: './ordered-items.component.html',
  styleUrls: ['./ordered-items.component.scss']
})
export class OrderedItemsComponent implements OnInit {
  public orderedItemsList = [];
  public clientList = [];
  public clientListMap = {};

  constructor(private http: WebServiceService) { }

  ngOnInit(): void {
    this.getAllClients();
    this.getAllOrderedItems();
  }

  getAllOrderedItems() {
    this.http.get('api/v1/all-orderd-items').subscribe(data=>{
      console.log(data)
      this.orderedItemsList = data['rows'];
    })
  }

  getAllClients() {
    this.http.get('api/v1/all-clients').subscribe(data=>{
      console.log(data)
      this.clientList = data['rows'];
    }, err=>{
      console.log(err)
    },()=>{
      this.createIdMap(this.clientList)
    })
  }

  createIdMap(list) {
    if (!list) {
      return;
    }
    this.clientListMap = list.reduce((map, obj) => {
      map[obj.id] = obj;
      return map;
    }, {});
  }
}
