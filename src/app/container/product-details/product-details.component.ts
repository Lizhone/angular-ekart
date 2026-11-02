
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../Models/Product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  @Input() product!: Product;
  @Output() close = new EventEmitter<void>();

  @Output() addToCart = new EventEmitter<{
    product: Product;
    size: number;
    color: string;
    quantity: number;
  }>();

  selectedSize: number | null = null;
  selectedColor: string | null = null;
  cartMessage = '';

  closeDetails(): void {
    this.close.emit();
  }

  selectSize(size: number): void {
    this.selectedSize = size;
    this.cartMessage = '';
  }

  selectColor(color: string): void {
    this.selectedColor = color;
    this.cartMessage = '';
  }

  addProductToCart(): void {
    this.cartMessage = '';

    if (!this.product || !this.product.is_in_inventory) {
      this.cartMessage = 'This product is out of stock.';
      return;
    }

    if (this.selectedSize === null) {
      this.cartMessage = 'Please select a size.';
      return;
    }

    if (this.selectedColor === null) {
      this.cartMessage = 'Please select a color.';
      return;
    }

    this.addToCart.emit({
      product: this.product,
      size: this.selectedSize,
      color: this.selectedColor,
      quantity: 1
    });

    this.cartMessage = 'Product added to cart!';
  }
}
