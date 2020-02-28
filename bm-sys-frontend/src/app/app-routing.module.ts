import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { AddOrderComponent } from './pages/add-order/add-order.component';
import { LoginComponent } from './pages/login/login.component';
import { OrderHistoryComponent } from './pages/order-history/order-history.component';
import { EditOrderComponent } from './pages/edit-order/edit-order.component';
import { OrderedItemsComponent } from './pages/ordered-items/ordered-items.component';
import { AddClientsComponent } from './pages/add-clients/add-clients.component';
import { ClientsListComponent } from './pages/clients-list/clients-list.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ClientSpecialOffersComponent } from './pages/client-special-offers/client-special-offers.component';
import { UserPanelComponent } from './pages/user-panel/user-panel.component';


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
  path: 'add-client',
  component: AddClientsComponent
},
{
  path: 'client-list',
  component: ClientsListComponent
},
{
  path: 'add-product',
  component: AddProductComponent
},
{
  path: 'product-list',
  component: ProductListComponent
},
{
  path: 'client-special-offers',
  component: ClientSpecialOffersComponent
},
{
  path: 'user-panel',
  component: UserPanelComponent
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
