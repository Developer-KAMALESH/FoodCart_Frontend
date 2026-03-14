import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Cart } from '../../../services/cart';

@Component({
  selector: 'app-menu',
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  constructor(private cartService: Cart) {}
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

  currentPage = 1;
  itemsPerPage = 6;

  categories = ["All", "Pizza", "Burger", "Pasta", "Snacks"];

selectedCategory = "All";
searchText = "";

  get filteredFoods(){

  return this.foods.filter(food => {

    const matchesCategory =
      this.selectedCategory === "All" ||
      food.category === this.selectedCategory;

    const matchesSearch =
      food.name.toLowerCase().includes(this.searchText.toLowerCase());

    return matchesCategory && matchesSearch;

  });

}

  get paginatedFoods(){

  const start = (this.currentPage - 1) * this.itemsPerPage;
  const end = start + this.itemsPerPage;

  return this.filteredFoods.slice(start, end);

}

  nextPage(){
    if(this.currentPage * this.itemsPerPage < this.foods.length){
      this.currentPage++;
    }
  }

  prevPage(){
    if(this.currentPage > 1){
      this.currentPage--;
    }
  }
  addToCart(food: any) {

  const cartItem = {
    id: food.id,
    name: food.name,
    price: food.price,
    image: food.image,
    quantity: 1
  };

  this.cartService.addItem(cartItem);

  console.log("Added to cart", food.name);

}
}
