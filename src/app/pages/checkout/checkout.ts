import { Component } from '@angular/core';
import { Cart } from '../../services/cart';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-checkout',
  imports: [CommonModule,RouterModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  constructor(private cartService: Cart) {}

  get cartItems() {
    return this.cartService.getItems();
  }

  get total() {
    return this.cartService.getTotal();
  }

  placeOrder() {
    alert('Order placed successfully!');
    this.cartService.clearCart();
  }
}
