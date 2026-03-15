// src/app/pages/cart/cart.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService, CartItem } from '../../../services/cart-services';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit, OnDestroy {

  cartItems: CartItem[] = [];
  couponInput = '';
  orderPlaced = false;

  private sub!: Subscription;

  constructor(public cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    // keep local list in sync with service
    this.sub = this.cartService.items$.subscribe(items => {
      this.cartItems = items;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  // ── Quantity controls ────────────────────────────────────────
  increment(id: number)  { this.cartService.increment(id); }
  decrement(id: number)  { this.cartService.decrement(id); }
  remove(id: number)     { this.cartService.removeFromCart(id); }

  // ── Coupon ───────────────────────────────────────────────────
  applyCoupon(): void {
    if (this.couponInput.trim()) {
      this.cartService.applyCoupon(this.couponInput);
    }
  }

  removeCoupon(): void {
    this.cartService.removeCoupon();
    this.couponInput = '';
  }

  // ── Billing helpers (delegate to service) ───────────────────
  get subtotal()        { return this.cartService.getSubtotal(); }
  get deliveryCharge()  { return this.cartService.getDeliveryCharge(); }
  get gst()             { return this.cartService.getGST(); }
  get discount()        { return this.cartService.getDiscount(); }
  get total()           { return this.cartService.getTotal(); }
  get isFreeDelivery()  { return this.cartService.isFreeDelivery(); }
  get appliedCoupon()   { return this.cartService.getAppliedCoupon(); }
  get itemTotal()       { return (item: CartItem) => item.price * item.quantity; }

  // ── Checkout ─────────────────────────────────────────────────
  checkout(): void {
    this.orderPlaced = true;
    setTimeout(() => {
      this.cartService.clearCart();
      this.orderPlaced = false;
      this.router.navigate(['/menu']);
    }, 3000);
  }

  goToMenu(): void {
    this.router.navigate(['/menu']);
  }
}