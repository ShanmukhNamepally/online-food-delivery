import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CartService } from '../../cart.service';
import { OrderItem } from '../../order-items.model';
import { error } from 'console';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems: OrderItem[] = [];

  constructor(private cartService: CartService, private router: Router) {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }

  increaseQty(item: OrderItem): void {
    this.cartService.increaseQty(item);
  }

  decreaseQty(item: OrderItem): void {
    this.cartService.decreaseQty(item);
  }

  removeItem(index: number): void {
    this.cartService.removeItem(index)
    // .subscribe({
    //   next: (data : any) =>{
    //     this.getTotal ;
    //   },
    //   error: (err: any) =>
    //   {
    //     console.log(err);
    //   }

    // });
    console.log("deleted");
    this.getTotal();
  }

  goToPayment(): void {
    this.cartService.goToPayment(this.router);
  }
}
