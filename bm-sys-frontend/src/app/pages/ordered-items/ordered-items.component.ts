import { Component, OnInit } from '@angular/core';
import { WebServiceService } from 'src/app/service/web-service.service';

@Component({
  selector: 'app-ordered-items',
  templateUrl: './ordered-items.component.html',
  styleUrls: ['./ordered-items.component.scss']
})
export class OrderedItemsComponent implements OnInit {
  public orderedItemsList = [];

  constructor(private http: WebServiceService) { }

  ngOnInit(): void {
    this.getAllOrderedItems();
  }

  getAllOrderedItems() {
    this.http.get('api/v1/all-orderd-items').subscribe(data=>{
      console.log(data)
      this.orderedItemsList = data['rows'];
    })
  }

}
