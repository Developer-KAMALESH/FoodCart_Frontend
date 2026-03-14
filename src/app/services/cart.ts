import { Injectable } from '@angular/core';
import { CartItem } from '../shared/models/cart-item';

@Injectable({
  providedIn: 'root',
})
export class Cart {
  private cartItems: CartItem[] = [];

  getItems(): CartItem[] {
    return this.cartItems;
  }

  addItem(item: CartItem) {

    const existingItem = this.cartItems.find(
      cartItem => cartItem.id === item.id
    );

    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({ ...item, quantity: 1 });
    }

  }

  removeItem(id: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== id);
  }

  increaseQuantity(id: number) {
    const item = this.cartItems.find(item => item.id === id);
    if (item) item.quantity++;
  }

  decreaseQuantity(id: number) {
    const item = this.cartItems.find(item => item.id === id);
    if (item && item.quantity > 1) {
      item.quantity--;
    }
  }

  getTotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  clearCart() {
    this.cartItems = [];
  }
}
