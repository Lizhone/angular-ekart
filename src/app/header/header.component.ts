
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isMenuOpen = false;
  cartCount = 0;

  private cartSubscription?: Subscription;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cartItems$.subscribe(items => {
      this.cartCount = items.reduce(
        (total, item) => total + item.quantity,
        0
      );
    });
  }

  ngOnDestroy(): void {
    this.cartSubscription?.unsubscribe();
  }
}
