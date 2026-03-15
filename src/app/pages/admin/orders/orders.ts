import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-orders',
  imports: [RouterModule,CommonModule],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders {
  pendingOrders = [
    {id:101, items:"Pizza x2", total:598},
    {id:102, items:"Burger x1", total:149}
  ];

  preparingOrders:any[] = [];
  readyOrders:any[] = [];
  completedOrders:any[] = [];

  moveToPreparing(order:any){
    this.pendingOrders =
      this.pendingOrders.filter(o => o.id !== order.id);

    this.preparingOrders.push(order);
  }

  moveToReady(order:any){
    this.preparingOrders =
      this.preparingOrders.filter(o => o.id !== order.id);

    this.readyOrders.push(order);
  }

  moveToDone(order:any){
    this.readyOrders =
      this.readyOrders.filter(o => o.id !== order.id);

    this.completedOrders.push(order);
  }
}
