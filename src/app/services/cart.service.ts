import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { OrderItem } from '../../Models/order-items.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:5288/api/OrderItems';
  private menuApiUrl = 'http://localhost:5288/api/MenuItems';
  cartItems: OrderItem[] = [];
  private readonly CART_STORAGE_KEY = 'cart'; // Define a constant for the storage key

  constructor(private http: HttpClient, private authService: AuthService) {
    this.loadCartFromLocalStorage(); // Load cart on service initialization
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  private saveCartToLocalStorage(): void {
    localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(this.cartItems));
  }

  private loadCartFromLocalStorage(): void {
    const storedCart = localStorage.getItem(this.CART_STORAGE_KEY);
    if (storedCart) {
      try {
        this.cartItems = JSON.parse(storedCart);
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        this.cartItems = [];
      }
    } else {
      this.cartItems = [];
    }
  }

  addToCart(item: OrderItem): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const existingItem = this.cartItems.find(cartItem => cartItem.itemID === item.itemID);

    if (existingItem) {
      existingItem.quantity += item.quantity;
      this.saveCartToLocalStorage(); // Save to localStorage on update
      return this.http.put(`${this.apiUrl}/${existingItem.orderItemID}`, existingItem, { headers, withCredentials: true }).pipe(
        tap(() => {
          console.log('Quantity updated for existing item:', existingItem);
        })
      );
    } else {
      this.cartItems.push(item);
      this.saveCartToLocalStorage(); // Save to localStorage on add
      return this.http.post(this.apiUrl, item, { headers, withCredentials: true }).pipe(
        tap(() => {
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
    return this.http.get<OrderItem[]>(url, { headers: this.getAuthHeaders() }).pipe(
      tap(items => {
        this.cartItems = items; // Update the local cartItems array with the fetched data
        this.saveCartToLocalStorage(); // Ensure localStorage is up-to-date
      })
    );
  }

  getMenuItems(): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(this.menuApiUrl, { headers: this.getAuthHeaders() });
  }

  getTotal(cartItems: any[]): number {
    this.cartItems = cartItems; // Ensure local cartItems is updated
    this.saveCartToLocalStorage(); // Keep localStorage in sync
    let total = 0;
    this.cartItems.forEach(item => {
      total += item.price * item.quantity;
    });
    return total;
  }

  getCartItemsFromLocalStorage(): any[] {
    const storedCart = localStorage.getItem(this.CART_STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
  }

  clearCart(): void {
    this.cartItems = [];
    localStorage.removeItem(this.CART_STORAGE_KEY);
  }

  increaseQty(item: OrderItem): Observable<any> {
    item.quantity++;
    this.saveCartToLocalStorage(); // Save on quantity change
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/${item.orderItemID}`, item, { headers, withCredentials: true }).pipe(
      tap(() => {
        console.log('Quantity increased:', item);
      })
    );
  }

  decreaseQty(item: OrderItem): Observable<any> {
    if (item.quantity > 1) {
      item.quantity--;
      this.saveCartToLocalStorage(); // Save on quantity change
      const headers = this.getAuthHeaders();
      return this.http.put(`${this.apiUrl}/${item.orderItemID}`, item, { headers, withCredentials: true }).pipe(
        tap(() => {
          console.log('Quantity decreased:', item);
        })
      );
    } else {
      return new Observable(observer => {
        observer.next(null);
        observer.complete();
      });
    }
  }

  removeItem(orderItemID: number): Observable<void> {
    this.cartItems = this.cartItems.filter(item => item.orderItemID !== orderItemID);
    this.saveCartToLocalStorage(); // Save on item removal
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