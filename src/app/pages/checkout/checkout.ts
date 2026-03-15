import { Component } from '@angular/core';
import { Cart } from '../../services/cart';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-checkout',
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  constructor(private cartService: Cart) {}

  orderType = "DELIVERY";

tableNumber = "";
pickupTime = "";

name = "";
phone = "";
email = "";

address = "";
city = "";
pincode = "";

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
