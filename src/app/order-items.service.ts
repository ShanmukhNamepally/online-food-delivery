import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuItem as MenuItemModel } from '../Models/menu-item.model';
import { AuthService } from './auth.service';
import { OrderItem } from './order-items.model';

@Injectable({
  providedIn: 'root'
})
export class OrderItemsService {
  private apiUrl = 'http://localhost:5288/api/OrderItems';
  private menuApiUrl = 'http://localhost:5288/api/MenuItems'; 

  constructor(private http: HttpClient,  private authService: AuthService) { }

  addToCart(item: OrderItem): Observable<any> {
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, item, { headers: this.getAuthHeaders() });
  }

  getCartItems(): Observable<MenuItemModel[]> {
    return this.http.get<MenuItemModel[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }
  
getMenuItems(): Observable<MenuItemModel[]> { // Add this method
      return this.http.get<MenuItemModel[]>(this.menuApiUrl, { headers: this.getAuthHeaders() });
    }
  

  // private getAuthHeaders(): HttpHeaders {
  //   const token = localStorage.getItem('token'); // Adjust based on your auth implementation
  //   return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  // }
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}
