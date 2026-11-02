
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../Models/Product';

export interface CartItem {
  cartItemId?: string;
  product: Product;
  size: number;
  color: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly storageKey = 'ekart_cart';

  private cartItemsSubject: BehaviorSubject<CartItem[]> =
    new BehaviorSubject<CartItem[]>(this.loadCart());

  cartItems$ = this.cartItemsSubject.asObservable();

  // Load saved cart items from localStorage.
  private loadCart(): CartItem[] {
    try {
      const savedCart = localStorage.getItem(this.storageKey);

      if (!savedCart) {
        return [];
      }

      const parsed: unknown = JSON.parse(savedCart);

      if (!Array.isArray(parsed)) {
        return [];
      }

      // Add IDs to older cart entries that do not have them.
      return parsed.map((item: CartItem, index: number) => ({
        ...item,
        cartItemId:
          item.cartItemId ??
          `${item.product.id}-${item.size}-${item.color}-${index}-${Date.now()}`
      }));
    } catch (error) {
      console.error('Could not load cart:', error);
      return [];
    }
  }

  // Save changes and notify all subscribed components.
  private saveCart(items: CartItem[]): void {
    try {
      localStorage.setItem(
        this.storageKey,
        JSON.stringify(items)
      );
    } catch (error) {
      console.error('Could not save cart:', error);
    }

    this.cartItemsSubject.next(items);
  }

  // Add a product or increase its quantity if the same
  // product, size, and color already exist in the cart.
  addToCart(item: CartItem): void {
    const items = [...this.cartItemsSubject.value];

    const existingIndex = items.findIndex(
      current =>
        current.product.id === item.product.id &&
        current.size === item.size &&
        current.color === item.color
    );

    if (existingIndex !== -1) {
      items[existingIndex] = {
        ...items[existingIndex],
        quantity:
          items[existingIndex].quantity + item.quantity
      };
    } else {
      const newItem: CartItem = {
        ...item,
        cartItemId:
          item.cartItemId ??
          `${item.product.id}-${item.size}-${item.color}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
      };

      items.push(newItem);
    }

    this.saveCart(items);
  }

  // Remove only the selected cart entry by its unique ID.
  removeFromCart(cartItemId: string | undefined): void {
    if (!cartItemId) {
      return;
    }

    const updatedItems = this.cartItemsSubject.value.filter(
      item => item.cartItemId !== cartItemId
    );

    this.saveCart(updatedItems);
  }

  // Update the quantity of only the selected cart entry.
  updateQuantity(
    cartItemId: string | undefined,
    quantity: number
  ): void {
    if (
      !cartItemId ||
      !Number.isInteger(quantity) ||
      quantity < 1
    ) {
      return;
    }

    const updatedItems = this.cartItemsSubject.value.map(
      item =>
        item.cartItemId === cartItemId
          ? { ...item, quantity }
          : item
    );

    this.saveCart(updatedItems);
  }

  // Get total quantity across all cart entries.
  getCartCount(): number {
    return this.cartItemsSubject.value.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }

  // Empty the entire cart.
  clearCart(): void {
    this.saveCart([]);
  }
}
