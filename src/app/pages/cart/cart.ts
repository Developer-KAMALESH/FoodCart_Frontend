import { Component } from '@angular/core';
import { Cart } from '../../services/cart';
import { CartItem } from '../../shared/models/cart-item';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.html',
  imports: [RouterModule,CommonModule,FormsModule],
  styleUrls: ['./cart.css']
})
export class CartComponent {

  constructor(private cartService: Cart) {}

  get cartItems(): CartItem[] {
    return this.cartService.getItems();
  }

  increaseQuantity(id: number) {
    this.cartService.increaseQuantity(id);
  }

  decreaseQuantity(id: number) {
    this.cartService.decreaseQuantity(id);
  }

  removeItem(id: number) {
    this.cartService.removeItem(id);
  }

  get total(): number {
    return this.cartService.getTotal();
  }

}