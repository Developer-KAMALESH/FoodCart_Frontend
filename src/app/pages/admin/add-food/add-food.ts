import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-food',
  imports: [FormsModule,RouterModule,CommonModule],
  templateUrl: './add-food.html',
  styleUrl: './add-food.css',
})
export class AddFood {
  food = {
    name: '',
    category: '',
    price: 0,
    description: '',
    image: ''
  };

  addFood(){

    console.log("New Food Item:", this.food);

    // later send to backend API

    alert("Food item added successfully!");

    this.food = {
      name: '',
      category: '',
      price: 0,
      description: '',
      image: ''
    };

  }
}
