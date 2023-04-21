import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { DataTableModule } from 'angular5-data-table';
import { CustomFormsModule } from 'ng2-validation';
import { ShoppingModule } from './../shopping/shopping.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminAuthGuardService } from '../admin/service/admin-auth-guard.service';
import { CategoryService } from 'shared/service/category.service';
import { OrderService } from 'shared/service/order.service';
import { ShoppingCartService } from 'shared/service/shopping-cart.service';

import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { AuthService } from './service/auth.service';
import { ProductService } from './service/product.service';
import { UserService } from './service/user.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent
  ],
  exports: [
    CommonModule,
    ProductCardComponent,
    ProductQuantityComponent,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot().ngModule,
  ],
  providers: [
    AuthService,
    AdminAuthGuardService,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService,
  ]
})
export class SharedModule { }
