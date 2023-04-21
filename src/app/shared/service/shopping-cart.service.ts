import { Observable } from 'rxjs/Observable';
import { Product } from 'shared/models/product';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
      .map(c => new ShoppingCart(c.items));
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
      // if local storage has cartID, return it.. else create one and store it.
    if (cartId) { return cartId; }
      const result = await this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;
  }

  private getItem(cartId: string, productId: string) {
    // items observeble sets an object in db based off of cartID then adds the product key to items
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  // gets the cartID and items based off of cartId 
    private async updateItem(product: Product, change: number) {
      const cartId = await this.getOrCreateCartId();
      const item$ = this.getItem(cartId, product.$key);
      // take one kills the observable so you dont have to unsubscribe.
      item$.take(1).subscribe(item => {
        let quantity = (item.quantity || 0) + change;
        if (quantity === 0) item$.remove();
        else item$.update({
           title: product.title,
           imageUrl: product.imageUrl,
           price: product.price, 
           quantity: quantity
          });
      });
    }
}
