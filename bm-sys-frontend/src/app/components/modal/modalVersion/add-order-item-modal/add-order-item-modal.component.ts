import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { WebServiceService } from 'src/app/service/web-service.service';

@Component({
  selector: 'app-add-order-item-modal',
  templateUrl: './add-order-item-modal.component.html',
  styleUrls: ['./add-order-item-modal.component.scss']
})
export class AddOrderItemModalComponent implements OnInit {
  @Input() dataPassToModal;
  public addOrderItem: FormGroup;
  public produtPrive = 0;
  public selectedItem = '';
  constructor(private fb: FormBuilder,  private http: WebServiceService) { }

  ngOnInit(): void {
    console.log(this.dataPassToModal)
    this.addOrderItem = this.createOrderItemForm();
  }

  onChange() {
    this.produtPrive = this.dataPassToModal.productPriceMap[this.selectedItem].product_default_price;
  }

  createOrderItemForm() {
    return this.fb.group({
      id: null,
      productWeight: this.fb.control(""),
    });
  }

  addOrderItemToList(){
    const passValue = this.addOrderItem.value;
        passValue.productId = this.selectedItem;
        passValue.productName = this.dataPassToModal.productPriceMap[this.selectedItem].product_name;
        passValue.productPrice = this.dataPassToModal.productPriceMap[this.selectedItem].product_default_price;
        passValue.sumPrice = passValue.productWeight * this.dataPassToModal.productPriceMap[this.selectedItem].product_default_price;
    console.log(passValue)
    this.http
      .post(`api/v1/add-single-item/${this.dataPassToModal.orderId}`, passValue)
      .subscribe(data => {
        console.log(data);
      });
  }
}
