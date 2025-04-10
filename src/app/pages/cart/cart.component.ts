import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems = [
    { name: 'Chicken Biryani', price: 199, quantity: 1 },
    { name: 'Cheese Pizza', price: 249, quantity: 1 },
  ];

  constructor(private router: Router) {}
 
  getTotal() {
    return this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }
 
  increaseQty(item: any) {
    item.quantity++;
  }
 
  decreaseQty(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }
 
  removeItem(index: number) {
    this.cartItems.splice(index, 1);
  }
  goToPayment() {
    this.router.navigate(['/payment-page']);
  }
}