import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { OrderItem } from '../Models/order-items.model';
 
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:5288/api/OrderItems';
  private menuApiUrl = 'http://localhost:5288/api/MenuItems';
  cartItems: OrderItem[] = [];
 
  constructor(private http: HttpClient, private authService: AuthService) { }
 
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
 
  addToCart(item: OrderItem): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const existingItem = this.cartItems.find(cartItem => cartItem.itemID === item.itemID);
 
    if (existingItem) {
      existingItem.quantity += item.quantity;
      return this.http.put(`${this.apiUrl}/${existingItem.orderItemID}`, existingItem, { headers, withCredentials: true }).pipe(
        tap(() => {
          console.log('Quantity updated for existing item:', existingItem);
        })
      );
    } else {
      return this.http.post(this.apiUrl, item, { headers, withCredentials: true }).pipe(
        tap(() => {
          this.cartItems.push(item);
          console.log('New item added:', item);
        })
      );
    }
  }
 
  
 
  getCartItems(): Observable<OrderItem[]> {
    const customerId = this.authService.getCustomerId();
    if (customerId === null) {
      throw new Error('Customer ID is null');
    }
    const url = `${this.apiUrl}/customer/${customerId}`;
   return this.http.get<OrderItem[]>(url, { headers: this.getAuthHeaders() });
   
  }
 
  getMenuItems(): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(this.menuApiUrl, { headers: this.getAuthHeaders() });
  }
 
  getTotal(cartItems:any[]): number {
    let total = 0;
    this.cartItems=cartItems;
    this.cartItems=cartItems;
    this.cartItems.forEach(item => {
      total += item.price * item.quantity;
    });
    return total;
  }
 
  increaseQty(item: OrderItem): void {
    item.quantity++;
  }
 
  decreaseQty(item: OrderItem): void {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }
 
  removeItem(orderItemID: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${orderItemID}`, { headers: this.getAuthHeaders() });
  }
 
  goToPayment(router: Router): void {
    router.navigate(['/payment-page']);
  }
 
  getCustomerId(): number | null {
    return this.authService.getCustomerId();
  }
  isItemInCart(itemID: number, customerID: number): boolean {
    return this.cartItems.some(cartItem => cartItem.itemID === itemID && cartItem.customerID === customerID);
  }
}