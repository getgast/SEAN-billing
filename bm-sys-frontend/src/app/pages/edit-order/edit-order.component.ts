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
import { DomSanitizer } from '@angular/platform-browser';

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
    "order_comment",
    "action"
  ];
  public clientList = [];
  public id: string;
  public orderData;
  public orderForm: FormGroup;
  public productPriceList = [];
  public mapProductPrice = {};
  public testBlob;
  public isBlobExist = false;

  constructor(
    private route: ActivatedRoute,
    private http: WebServiceService,
    private fb: FormBuilder,
    public matDialog: MatDialog,
    private sanitizer: DomSanitizer,
    @Optional() @Inject(MAT_DIALOG_DATA) data
  ) {
    this.orderForm = this.initOrderItemsForm();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.getProductPriceList();
    this.getAllClients()

    if (this.id) {
      this.getOrderData(this.id);
    }
  }

  getOrderData(id) {
    this.http.get(`api/v1/order/${id}`).subscribe(data => {
      this.orderData = data;
      //this.setFormArrayValue(this.orderData.orderChild);
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

  createClientMap(list) {
    console.log(list)
    return list.reduce((map, obj) => {
      map[obj.id] = obj;
      return map;
    }, {});
  }

  initOrderItemsForm() {
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

  getAllClients() {
    this.http.get('api/v1/all-clients').subscribe(data=>{
      console.log(data)
      this.clientList = data['rows'];
    })
  }

  findClientData(){
    return
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

  closeAndGeneratePdf(){
    console.log('pdf')
   this.passListToBE();
  }

  // test pass param
  passListToBE(){
    const clientMap = this.createClientMap(this.clientList);
    this.orderData.order.client = clientMap[this.orderData.order.client_id]

    this.http
    .postBlob(`api/v1/create-pdf-test`, this.orderData)
    .subscribe((data: Blob) => {
      console.log('pass')
      this.isBlobExist = true;
      let blob = new Blob([data])

      this.testBlob = blob

    });
  }

  dataToPdf(){
    return {
      shipping: {

      }
    }
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
      clientId: this.orderData.order.client_id || '',
      orderId: this.id,
      productPriceMap:  this.mapProductPrice,
      passParam: item || {}
    };
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);

    modalDialog.afterClosed().subscribe(data=>{
      if (this.id) {
        this.getOrderData(this.id);
      }
    })
  }
}
