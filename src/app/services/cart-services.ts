// src/app/services/cart-services.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// ── Interfaces ─────────────────────────────────────────────────────────────

export interface FoodItem {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
}

export interface CartItem extends FoodItem {
  quantity: number;
}

// ── Constants ──────────────────────────────────────────────────────────────

const DELIVERY_CHARGE       = 40;
const FREE_DELIVERY_ABOVE   = 500;   // subtotal >= ₹500 → free delivery
const GST_RATE              = 0.05;  // 5%
const MAX_QTY_PER_ITEM      = 10;
const ALERT_DURATION_MS     = 3000;

// ── Service ────────────────────────────────────────────────────────────────

@Injectable({ providedIn: 'root' })
export class CartService {

  // private state
  private _items    = new BehaviorSubject<CartItem[]>([]);
  private _alert    = new BehaviorSubject<string>('');
  private _discount = new BehaviorSubject<number>(0);
  private _coupon   = new BehaviorSubject<string>('');
  private alertTimer: ReturnType<typeof setTimeout> | null = null;

  // ── Public observables ───────────────────────────────────────────────────

  /** Subscribe in cart/navbar to get live item list */
  items$ = this._items.asObservable();

  /** Subscribe in alert-toast component */
  alert$ = this._alert.asObservable();

  /** Subscribe for live cart badge count */
  cartCount$ = this._items.pipe();   // use getCartCount() for simplicity

  // ── ADD ──────────────────────────────────────────────────────────────────

  addToCart(food: FoodItem): void {
    const list  = this._items.getValue();
    const found = list.find(i => i.id === food.id);

    if (found) {
      if (found.quantity >= MAX_QTY_PER_ITEM) {
        this.showAlert(`Max ${MAX_QTY_PER_ITEM} of "${food.name}" allowed ⚠️`);
        return;
      }
      this._items.next(
        list.map(i => i.id === food.id ? { ...i, quantity: i.quantity + 1 } : i)
      );
    } else {
      this._items.next([...list, { ...food, quantity: 1 }]);
    }

    this.showAlert(`"${food.name}" added to cart! 🛒`);
  }

  // ── REMOVE ───────────────────────────────────────────────────────────────

  removeFromCart(id: number): void {
    const item = this._items.getValue().find(i => i.id === id);
    this._items.next(this._items.getValue().filter(i => i.id !== id));
    if (item) this.showAlert(`"${item.name}" removed from cart`);
  }

  // ── QUANTITY ─────────────────────────────────────────────────────────────

  increment(id: number): void {
    const list = this._items.getValue();
    const item = list.find(i => i.id === id);
    if (!item) return;
    if (item.quantity >= MAX_QTY_PER_ITEM) {
      this.showAlert(`Max ${MAX_QTY_PER_ITEM} per item ⚠️`);
      return;
    }
    this._items.next(list.map(i => i.id === id ? { ...i, quantity: i.quantity + 1 } : i));
  }

  decrement(id: number): void {
    const list = this._items.getValue();
    const item = list.find(i => i.id === id);
    if (!item) return;
    if (item.quantity <= 1) {
      this.removeFromCart(id);
    } else {
      this._items.next(list.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i));
    }
  }

  // ── CLEAR ────────────────────────────────────────────────────────────────

  clearCart(): void {
    this._items.next([]);
    this._discount.next(0);
    this._coupon.next('');
  }

  // ── COUPON ───────────────────────────────────────────────────────────────

  private validCoupons: Record<string, number> = {
    SAVE10: 10, SAVE50: 50, NEWUSER: 30
  };

  applyCoupon(code: string): boolean {
    const key      = code.trim().toUpperCase();
    const discount = this.validCoupons[key];

    if (!discount) {
      this.showAlert(`Invalid coupon "${code}" ❌`);
      return false;
    }
    if (this._coupon.getValue()) {
      this.showAlert('A coupon is already applied. Remove it first.');
      return false;
    }
    this._discount.next(discount);
    this._coupon.next(key);
    this.showAlert(`Coupon "${key}" applied! ₹${discount} off 🎉`);
    return true;
  }

  removeCoupon(): void {
    this._discount.next(0);
    this._coupon.next('');
    this.showAlert('Coupon removed');
  }

  getAppliedCoupon(): string {
    return this._coupon.getValue();
  }

  // ── GETTERS (synchronous snapshots) ─────────────────────────────────────

  getItems(): CartItem[] {
    return this._items.getValue();
  }

  getCartCount(): number {
    return this._items.getValue().reduce((sum, i) => sum + i.quantity, 0);
  }

  isInCart(id: number): boolean {
    return this._items.getValue().some(i => i.id === id);
  }

  getQuantity(id: number): number {
    return this._items.getValue().find(i => i.id === id)?.quantity ?? 0;
  }

  getSubtotal(): number {
    return this._items.getValue().reduce((s, i) => s + i.price * i.quantity, 0);
  }

  getDeliveryCharge(): number {
    const subtotal = this.getSubtotal();
    if (this.getItems().length === 0) return 0;
    return subtotal >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_CHARGE;
  }

  getGST(): number {
    return Math.round(this.getSubtotal() * GST_RATE);
  }

  getDiscount(): number {
    return this._discount.getValue();
  }

  isFreeDelivery(): boolean {
    return this.getSubtotal() >= FREE_DELIVERY_ABOVE;
  }

  getTotal(): number {
    return Math.max(
      0,
      this.getSubtotal() + this.getDeliveryCharge() + this.getGST() - this.getDiscount()
    );
  }

  // ── PRIVATE ──────────────────────────────────────────────────────────────

  private showAlert(message: string): void {
    if (this.alertTimer) clearTimeout(this.alertTimer);
    this._alert.next(message);
    this.alertTimer = setTimeout(() => this._alert.next(''), ALERT_DURATION_MS);
  }
}