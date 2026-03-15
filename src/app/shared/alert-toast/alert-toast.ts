// src/app/shared/alert-toast/alert-toast.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart-services';

@Component({
  selector: 'app-alert-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast" *ngIf="message">
      🛒 {{ message }}
    </div>
  `,
  styles: [`
    .toast {
      position: fixed;
      bottom: 28px;
      right: 28px;
      background: #222;
      color: #fff;
      padding: 13px 20px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      box-shadow: 0 4px 18px rgba(0,0,0,0.25);
      z-index: 10000;
      animation: slideUp 0.3s ease;
      max-width: 320px;
    }
    @keyframes slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to   { transform: translateY(0);    opacity: 1; }
    }
  `]
})
export class AlertToast implements OnInit, OnDestroy {
  message = '';
  private sub!: Subscription;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.sub = this.cartService.alert$.subscribe(msg => {
      this.message = msg;
    });
  }

  ngOnDestroy() { this.sub.unsubscribe(); }
}