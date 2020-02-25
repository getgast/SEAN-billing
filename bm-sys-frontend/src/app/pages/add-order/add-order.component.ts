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
  public orderForm: FormGroup;
  constructor(private http: WebServiceService, private router: Router) { }

  ngOnInit(): void {
    this.orderForm = this.createOrderForm();
  }

  createOrderForm() {
    return new FormGroup({
      title: new FormControl(),
    })
  }

  onSubmit(){
    this.http.post('api/v1/add-order', this.orderForm.value).subscribe(data=>{
      console.log(data)
      this.router.navigate(['/edit-order', data['id']]);
    })
  }
}
