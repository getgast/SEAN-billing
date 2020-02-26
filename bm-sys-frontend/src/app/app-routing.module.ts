import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { AddOrderComponent } from './pages/add-order/add-order.component';
import { LoginComponent } from './pages/login/login.component';
import { OrderHistoryComponent } from './pages/order-history/order-history.component';
import { EditOrderComponent } from './pages/edit-order/edit-order.component';
import { OrderedItemsComponent } from './pages/ordered-items/ordered-items.component';


const routes: Routes = [{
  path: '',
  component: LoginComponent
},
{
  path: 'home',
  component: MainComponent
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'add-order',
  component: AddOrderComponent
},
{
  path: 'ordered-items',
  component: OrderedItemsComponent
},
{
  path: 'edit-order/:id',
  component: EditOrderComponent
},
{
  path: 'order-history',
  component: OrderHistoryComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
