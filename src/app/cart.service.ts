import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { OrderItem } from './order-items.model';

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
    return this.http.post(this.apiUrl, item, { headers, withCredentials: true }).pipe(
      tap(() => {
        this.cartItems.push(item);
      })
    );
  }

  getCartItems(): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getMenuItems(): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(this.menuApiUrl, { headers: this.getAuthHeaders() });
  }

  getTotal(): number {
    let total = 0;
    this.cartItems.forEach(item => {
      console.log('Item:', item);
      console.log('Item price:', item.price);
      console.log('Item quantity:', item.quantity);
      total += item.price * item.quantity;
    });
    console.log('Total calculated:', total);
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
}
