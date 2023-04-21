import { OrderService } from 'shared/service/order.service';
import { AuthService } from 'shared/service/auth.service';
import { Order } from 'shared/models/order';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
 @Input('cart') cart: ShoppingCart;
  shipping:any = {};
  userId: string;
  userSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router) { }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);

  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }    

}
