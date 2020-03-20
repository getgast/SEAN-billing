import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { WebServiceService } from 'src/app/service/web-service.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  public productPriceForm: FormGroup;

  constructor(private http: WebServiceService) { }

  ngOnInit(): void {
    this.productPriceForm = this.createProductPriceForm();
  }

  createProductPriceForm() {
    return new FormGroup({
      productName: new FormControl(),
      productPrice: new FormControl()
    })
  }s

  onSubmit() {
    this.http.post('api/v1/add-product', this.productPriceForm.value).subscribe(data=>{
      console.log(data)
    })
  }
}
