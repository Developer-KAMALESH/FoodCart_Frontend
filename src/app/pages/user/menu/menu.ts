// src/app/pages/menu/menu.ts  — replace your existing file

import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService, FoodItem } from '../../../services/cart-services';
import { AlertToast } from '../../../shared/alert-toast/alert-toast';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, AlertToast],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu implements OnInit, OnDestroy {

  constructor(private cartService: CartService) {}

  cartCount = 0;
  private sub!: Subscription;

  ngOnInit(): void {
    // live badge count
    this.sub = this.cartService.items$.subscribe(() => {
      this.cartCount = this.cartService.getCartCount();
    });
  }

  ngOnDestroy(): void { this.sub.unsubscribe(); }

  // ── same food data you already have ────────────────────────
  foods: FoodItem[] = [
    { id:1, name:'Margherita Pizza',  category:'Pizza',  description:'Classic cheese pizza',     price:299, image:'https://picsum.photos/300/200?1' },
    { id:2, name:'Veg Burger',        category:'Burger', description:'Loaded veggie burger',      price:149, image:'https://picsum.photos/300/200?2' },
    { id:3, name:'French Fries',      category:'Snacks', description:'Crispy fries',              price:99,  image:'https://picsum.photos/300/200?3' },
    { id:4, name:'Pasta Alfredo',     category:'Pasta',  description:'Creamy white pasta',        price:199, image:'https://picsum.photos/300/200?4' },
    { id:5, name:'Farmhouse Pizza',   category:'Pizza',  description:'Loaded vegetable pizza',    price:349, image:'https://picsum.photos/300/200?5' },
    { id:6, name:'Chicken Burger',    category:'Burger', description:'Grilled chicken burger',    price:179, image:'https://picsum.photos/300/200?6' },
  ];

  currentPage      = 1;
  itemsPerPage     = 6;
  categories       = ['All', 'Pizza', 'Burger', 'Pasta', 'Snacks'];
  selectedCategory = 'All';
  searchText       = '';

  get filteredFoods(): FoodItem[] {
    return this.foods.filter(food => {
      const matchesCategory = this.selectedCategory === 'All' || food.category === this.selectedCategory;
      const matchesSearch   = food.name.toLowerCase().includes(this.searchText.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }

  get paginatedFoods(): FoodItem[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredFoods.slice(start, start + this.itemsPerPage);
  }

  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.filteredFoods.length) this.currentPage++;
  }

  prevPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  // ── ADD TO CART ─────────────────────────────────────────────
  addToCart(food: FoodItem): void {
    this.cartService.addToCart(food);   // toast fires automatically from service
  }

  // ── helper used by template ─────────────────────────────────
  isInCart(id: number): boolean {
    return this.cartService.isInCart(id);
  }

  getQuantity(id: number): number {
    return this.cartService.getQuantity(id);
  }
}