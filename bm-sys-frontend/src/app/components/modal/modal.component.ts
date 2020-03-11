import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { WebServiceService } from 'src/app/service/web-service.service';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  public displayedColumns: string[] = [
    "product",
    "order_amount",
    "product_price",
    "order_price",
    "action"
  ];
  public itemAmount;
  public testStr: any;
  public modalVersion = '';
  constructor(@Inject(MAT_DIALOG_DATA) data, public dialogRef: MatDialogRef<ModalComponent>, private http: WebServiceService) {
    this.testStr = data;
  }

  ngOnInit(): void {
    console.log(this.testStr)
    this.itemAmount = this.testStr.passParam.order_amount;
    this.modalVersion = this.testStr.modalVersion;
  }

  initForm(){
    return new FormControl('itemAmount')
  }

  createValueTochange(){
    let startValue = this.testStr.passParam;
        startValue.order_amount = this.itemAmount;
    return startValue
  }

  saveEditProduct(){
    const editValue = this.createValueTochange();
    this.http.put(`api/v1/add-order-items/${this.testStr.passParam.order_id}`, editValue).subscribe(data=>{
      console.log(data)
    }, err=>{
      this.closeModal();
    })
  }

  // When the user clicks the action button a.k.a. the logout button in the\
  // modal, show an alert and followed by the closing of the modal
  actionFunction() {
    this.saveEditProduct();
  }

  // If the user clicks the cancel button a.k.a. the go back button, then\
  // just close the modal
  closeModal() {
    this.dialogRef.close();
  }
}
