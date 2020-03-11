import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { WebServiceService } from 'src/app/service/web-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {
  public clientList = [];
  public selectedClient = '';

  constructor(private http: WebServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getAllClients()
  }

  onSubmit(){
    const passValue = {
      title: 'B&MSausages',
      klient: this.selectedClient
    }

    this.http.post('api/v1/add-order', passValue).subscribe(data=>{
      this.router.navigate(['/edit-order', data['id']]);
    })
  }

  getAllClients() {
    this.http.get('api/v1/all-clients').subscribe(data=>{
      console.log(data)
      this.clientList = data['rows'];
    })
  }
}
