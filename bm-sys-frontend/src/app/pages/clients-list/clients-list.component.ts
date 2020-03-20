import { Component, OnInit } from '@angular/core';
import { WebServiceService } from 'src/app/service/web-service.service';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit {
  public clientList = [];
  public displayedColumns: string[] = [
    "clientName",
    "clientAdres",
    "clientPhone"
  ];
  constructor(private http: WebServiceService) { }

  ngOnInit(): void {
    this.getAllClients();
  }

  getAllClients() {
    this.http.get('api/v1/all-clients').subscribe(data=>{
      console.log(data)
      this.clientList = data['rows'];
    })
  }

}
