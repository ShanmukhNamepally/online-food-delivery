import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CartService } from '../../services/cart.service';
import { OrderItem } from '../../../Models/order-items.model';
 
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems: OrderItem[] = [];
  totalAmount: number =0;
 
  constructor(private cartService: CartService, private router: Router) {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.updateTotal();
      console.log('Cart items loaded:', this.cartItems);
    });
  }
 
  updateTotal(): void {
 
    this.totalAmount = this.cartService.getTotal(this.cartItems);
    console.log('Total amount updated:', this.totalAmount);
  }
 
 
  increaseQty(item: OrderItem): void {
    this.cartService.increaseQty(item).subscribe({
      next: () => {
        this.updateTotal();
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
  
  decreaseQty(item: OrderItem): void {
    this.cartService.decreaseQty(item).subscribe({
      next: () => {
        this.updateTotal();
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
  
 
  removeItem(index: number): void {
    const itemID = this.cartItems[index].orderItemID;
    this.cartService.removeItem(itemID).subscribe({
      next: () => {
        this.cartItems.splice(index, 1);
        this.updateTotal();
        console.log('Item removed:', itemID);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
 
  goToPayment(): void {
    this.cartService.goToPayment(this.router);
  }
 
}