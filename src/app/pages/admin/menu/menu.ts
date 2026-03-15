import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  imports: [CommonModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  foods = [
  { id:1, name:"Margherita Pizza", category:"Pizza", description:"Classic cheese pizza", price:299, image:"https://picsum.photos/300/200?1"},
  { id:2, name:"Veg Burger", category:"Burger", description:"Loaded veggie burger", price:149, image:"https://picsum.photos/300/200?2"},
  { id:3, name:"French Fries", category:"Snacks", description:"Crispy fries", price:99, image:"https://picsum.photos/300/200?3"},
  { id:4, name:"Pasta Alfredo", category:"Pasta", description:"Creamy white pasta", price:199, image:"https://picsum.photos/300/200?4"},
  { id:5, name:"Farmhouse Pizza", category:"Pizza", description:"Loaded vegetable pizza", price:349, image:"https://picsum.photos/300/200?5"},
  { id:6, name:"Chicken Burger", category:"Burger", description:"Grilled chicken burger", price:179, image:"https://picsum.photos/300/200?6"},
  { id:7, name:"Margherita Pizza", category:"Pizza", description:"Classic cheese pizza", price:299, image:"https://picsum.photos/300/200?1"},
  { id:8, name:"Veg Burger", category:"Burger", description:"Loaded veggie burger", price:149, image:"https://picsum.photos/300/200?2"},
  { id:9, name:"French Fries", category:"Snacks", description:"Crispy fries", price:99, image:"https://picsum.photos/300/200?3"},
  { id:10, name:"Pasta Alfredo", category:"Pasta", description:"Creamy white pasta", price:199, image:"https://picsum.photos/300/200?4"},
  { id:11, name:"Farmhouse Pizza", category:"Pizza", description:"Loaded vegetable pizza", price:349, image:"https://picsum.photos/300/200?5"},
  { id:12, name:"Margherita Pizza", category:"Pizza", description:"Classic cheese pizza", price:299, image:"https://picsum.photos/300/200?1"},
  { id:13, name:"Veg Burger", category:"Burger", description:"Loaded veggie burger", price:149, image:"https://picsum.photos/300/200?2"},
  { id:14, name:"French Fries", category:"Snacks", description:"Crispy fries", price:99, image:"https://picsum.photos/300/200?3"},
  { id:15, name:"Pasta Alfredo", category:"Pasta", description:"Creamy white pasta", price:199, image:"https://picsum.photos/300/200?4"},
  { id:16, name:"Farmhouse Pizza", category:"Pizza", description:"Loaded vegetable pizza", price:349, image:"https://picsum.photos/300/200?5"}
];
}
