import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private authService: AuthService) {}

  private getUserKey(): string {
    const userEmail = this.authService.getEmail();
    return `orderHistory_${userEmail}`;
  }

  placeOrder(order: any): Observable<any> {
    const orderHistory = this.getOrderHistory();
    const orderId = orderHistory.length + 1;

    // The cart items are now passed within the 'order' object
    const cartItems = order.items;
    console.log('Cart Items received in placeOrder:', cartItems); // Add this line for debugging

    // Ensure cartItems is defined and is an array
    const processedItems = Array.isArray(cartItems) ? cartItems.map((item: any) => ({
      productName: item.productName, // Access properties from the passed 'item'
      productImage: item.productImage,
      unitPrice: item.unitPrice,
      quantity: item.quantity
    })) : [];
    console.log('Processed Items in placeOrder:', processedItems); // Add this line for debugging

    const newOrder = {
      orderId,
      orderItems: processedItems,
      orderDate: new Date(),
      status: 'Preparing'
    };
    console.log('New Order Object to be saved:', newOrder); // Add this line for debugging

    orderHistory.push(newOrder);
    const userKey = this.getUserKey();
    localStorage.setItem(userKey, JSON.stringify(orderHistory));
    return of(newOrder);
  }

  getOrderHistory(): any[] {
    const userKey = this.getUserKey();
    try {
      const orderHistory = localStorage.getItem(userKey);
      const parsed = orderHistory ? JSON.parse(orderHistory) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error('Error parsing orderHistory from localStorage', e);
      return [];
    }
  }

  private getCartItemsFromLocalStorage(): any[] {
    const cartItems = localStorage.getItem('cart');
    return cartItems ? JSON.parse(cartItems) : [];
  }

  clearOrderHistory(): void {
    const userKey = this.getUserKey();
    localStorage.removeItem(userKey);
  }
}