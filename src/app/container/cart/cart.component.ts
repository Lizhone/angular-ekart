
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  CartService,
  CartItem
} from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  cartItems: CartItem[] = [];
  private cartSubscription?: Subscription;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cartItems$.subscribe(
      items => {
        this.cartItems = items;
      }
    );
  }

  get cartTotal(): number {
    return this.cartItems.reduce(
      (total, item) =>
        total +
        (item.product.discountPrice ?? item.product.price) *
          item.quantity,
      0
    );
  }

  getTotalQuantity(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }

  removeItem(index: number): void {
    const item = this.cartItems[index];

    if (!item) {
      return;
    }

    this.cartService.removeFromCart(item.cartItemId);
  }

  decreaseQuantity(index: number): void {
    const item = this.cartItems[index];

    if (!item) {
      return;
    }

    if (item.quantity > 1) {
      this.cartService.updateQuantity(
        item.cartItemId,
        item.quantity - 1
      );
    } else {
      this.cartService.removeFromCart(item.cartItemId);
    }
  }

  increaseQuantity(index: number): void {
    const item = this.cartItems[index];

    if (!item) {
      return;
    }

    if (item.quantity < item.product.items_left) {
      this.cartService.updateQuantity(
        item.cartItemId,
        item.quantity + 1
      );
    }
  }

  ngOnDestroy(): void {
    this.cartSubscription?.unsubscribe();
  }
}
