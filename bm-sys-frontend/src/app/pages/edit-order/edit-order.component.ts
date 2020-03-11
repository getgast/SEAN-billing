import { Component, OnInit, Inject, Optional } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { WebServiceService } from "src/app/service/web-service.service";
import { FormGroup, FormArray, FormControl, FormBuilder } from "@angular/forms";
import {
  MatDialog,
  MatDialogConfig,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { ModalComponent } from "./../../components/modal/modal.component";

@Component({
  selector: "app-edit-order",
  templateUrl: "./edit-order.component.html",
  styleUrls: ["./edit-order.component.scss"]
})
export class EditOrderComponent implements OnInit {
  public displayedColumns: string[] = [
    "product",
    "order_amount",
    "product_price",
    "order_price",
    "action"
  ];
  public id: string;
  public orderData;
  public orderForm: FormGroup;
  public productPriceList = [];
  public mapProductPrice = {};

  constructor(
    private route: ActivatedRoute,
    private http: WebServiceService,
    private fb: FormBuilder,
    public matDialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) data
  ) {
    this.orderForm = this.initOrderItemsForm();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.getProductPriceList();

    if (this.id) {
      this.getOrderData(this.id);
    }
  }

  getOrderData(id) {
    this.http.get(`api/v1/order/${id}`).subscribe(data => {
      this.orderData = data;
      this.setFormArrayValue(this.orderData.orderChild);
    });
  }

  getProductPriceList() {
    this.http.get("api/v1/product-list").subscribe(
      data => {
        console.log(data);
        this.productPriceList = data["rows"];
      },
      err => {
        console.log(err);
      },
      () => {
        this.createIdMap(this.productPriceList);
      }
    );
  }

  setFormArrayValue(list) {
    const setList = list.map(item => {
      console.log(item);
      this.orderItemList.push(this.createOrderItem(item));
    });
  }

  checkItem(index, item, last) {
    const sumPrive = 10;
    if (!index) {
      return;
    }

    //this.orderItemList['controls'][index].get('sumPrice').setValue(sumPrive)
    return (item.sumPrice = sumPrive);
  }

  createIdMap(list) {
    console.log(list);
    if (!list) {
      return;
    }
    this.mapProductPrice = list.reduce((map, obj) => {
      map[obj.product_id] = obj;
      return map;
    }, {});
  }

  initOrderItemsForm() {
    console.log("init form");
    return this.fb.group({
      orderId: "",
      orderItemList: this.fb.array([])
    });
  }

  get orderItemList() {
    return this.orderForm.get("orderItemList") as FormArray;
  }

  createOrderItem(item = null) {
    console.log(item);
    return this.fb.group({
      id: item?.id || null,
      productId: this.fb.control(item?.product_id || ""),
      productWeight: this.fb.control(item?.order_amount || ""),
      productPrice: this.fb.control(item?.price || ""),
      sumPrice: ""
    });
  }

  addOrderItem() {
    this.orderItemList.push(this.createOrderItem());
  }

  onSubmit() {
    console.log(this.mapProductPrice);
    const formValue = this.orderForm.value;
          formValue.orderItemList.map(item => {
        let itemChange = item;

        itemChange.productName = this.mapProductPrice[item.productId].product_name;
        itemChange.sumPrice = item.productWeight * this.mapProductPrice[item.productId].product_default_price;

        return itemChange;
      });

    this.http
      .post(`api/v1/add-order-items/${this.id}`, formValue)
      .subscribe(data => {
        console.log(data);
      });
  }

  deleteOrderItem(element) {
    const elemBody = element;
    console.log(elemBody)
    this.http
      .post(`api/v1/delete-order-items/${this.id}`, elemBody)
      .subscribe(data => {
        this.getOrderData(this.id);
      });
  }

  editOrder(item) {
    this.openModal(item, 'edit');
  }

  openAddProductModal(){
    this.openModal({}, 'add');
  }

  // modal methods

  openModal(item, version) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    dialogConfig.data = {
      modalVersion: version,
      orderId: this.id,
      productPriceMap:  this.mapProductPrice,
      passParam: item || {}
    };
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
  }
}
