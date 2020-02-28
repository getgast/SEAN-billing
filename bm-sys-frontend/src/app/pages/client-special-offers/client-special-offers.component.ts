import { Component, OnInit } from '@angular/core';
import { WebServiceService } from 'src/app/service/web-service.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-client-special-offers',
  templateUrl: './client-special-offers.component.html',
  styleUrls: ['./client-special-offers.component.scss']
})

export class ClientSpecialOffersComponent implements OnInit {
  public clientList = [];
  public clientID = '';
  public addSpecialPriceform: FormGroup;
  public productList = [];

  constructor(private http: WebServiceService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getAllClients();
    this.addFormForSpecialOffer();
    this.getProductList();
  }

  getAllClients() {
    this.http.get('api/v1/all-clients').subscribe(data=>{
      console.log(data)
      this.clientList = data['rows'];
    })
  }

  onClientChange(e) {
    console.log(e.value)
    this.clientID = e.value;
    console.log('this.clientID---> '+ this.clientID)
    this.http.get(`api/v1/client-price/${e.value}`).subscribe(data=>{
      console.log(data)
    })
  }

  getProductList() {
    this.http.get('api/v1/product-list').subscribe(data=>{
      console.log(data)
      this.productList = data['rows'];
    })
  }

  initSpecialPriceForm() {
    console.log('init form-->' +  this.clientID)
    return this.fb.group({
      clientId: this.clientID,
      productWithPromoPrice: this.fb.array([]),
    });
  }

  addFormForSpecialOffer() {
    this.addSpecialPriceform = this.initSpecialPriceForm()
  }

  get specialPriceList() {
    return this.addSpecialPriceform.get('productWithPromoPrice') as FormArray;
  }

  createSpecialPriceForProduct() {
    return this.fb.group({
      productId: this.fb.control(''),
      productPrice: this.fb.control('')
    });
  }

  addProductForPromoPrice() {
    console.log('addProductForPromoPrice')
    this.specialPriceList.push(this.createSpecialPriceForProduct())
  }

  onSubmit(){
    console.log(this.addSpecialPriceform.value)
    const formValue = this.addSpecialPriceform.value;

    formValue.clientId = this.clientID;
     console.log(formValue)
    this.http.post('api/v1/add-product-promo', formValue).subscribe(data=>{
      console.log(data)
    })
  }

}
