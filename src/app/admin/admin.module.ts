import { AuthGuardService } from './../shared/service/auth-guard.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminAuthGuardService } from './service/admin-auth-guard.service';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'shared/shared.module';
import { DataTableModule } from 'angular5-data-table';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: 'admin/products/new', component: ProductFormComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService]
      },

      {
        path: 'admin/products/:id', component: ProductFormComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService]
      },

      {
        path: 'admin/products', component: AdminProductsComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService]
      },

      {
        path: 'admin/orders', component: AdminOrdersComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService]
      },
    ])
  ],
  declarations: [
    ProductFormComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
  ],
  providers: [
    AdminAuthGuardService,
  ]
})
export class AdminModule { }
