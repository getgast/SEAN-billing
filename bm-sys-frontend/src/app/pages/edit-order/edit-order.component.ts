import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebServiceService } from 'src/app/service/web-service.service';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {
  public id: string;
  public orderData;
  public orderForm: FormGroup;

  constructor(private route: ActivatedRoute, private http: WebServiceService, private fb: FormBuilder) {
    this.orderForm = this.initOrderItemsForm()
  }

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

  initOrderItemsForm() {
    console.log('init form')
    return this.fb.group({
      orderId: '',
      orderItemList: this.fb.array([]),
    });
  }

  get orderItemList() {
    return this.orderForm.get('orderItemList') as FormArray;
  }

  createOrderItem() {
    return this.fb.group({
      productName: this.fb.control('Name'),
      productWeight: this.fb.control('1'),
      productPrice: this.fb.control('11')
    });
  }

  addOrderItem() {
    this.orderItemList.push(this.createOrderItem())
  }

  onSubmit() {
    console.log('zapisz')
    console.log(this.orderForm.value)
    this.http.post(`api/v1/add-order-items/${this.id}`, this.orderForm.value).subscribe(data=>{
      console.log(data)
    })
  }

}
