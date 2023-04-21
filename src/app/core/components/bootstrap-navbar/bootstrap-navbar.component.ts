import { ShoppingCart } from 'shared/models/shopping-cart';
import { Observable } from 'rxjs/Observable';
import { AppUser } from 'shared/models/app.user';
import { AuthService } from 'shared/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'shared/service/shopping-cart.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bootstrap-navbar',
  templateUrl: './bootstrap-navbar.component.html',
  styleUrls: ['./bootstrap-navbar.component.css']
})
export class BootstrapNavbarComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;

  constructor(private auth: AuthService,
              private cartService: ShoppingCartService) {
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.cartService.getCart();
  }

 logout() {
   this.auth.logout();
 }
}
