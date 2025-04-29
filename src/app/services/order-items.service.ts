import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuItem as MenuItemModel } from '../../Models/menu-item.model';
import { AuthService } from './auth.service';
import { OrderItem } from '../../Models/order-items.model';

@Injectable({
  providedIn: 'root'
})
export class OrderItemsService {
  private apiUrl = 'http://localhost:5288/api/OrderItems';
  private menuApiUrl = 'http://localhost:5288/api/MenuItems';

  constructor(private http: HttpClient, private authService: AuthService) { }

  addToCart(item: OrderItem): Observable<OrderItem> { // Specify the return type
    return this.http.post<OrderItem>(this.apiUrl, item, { headers: this.getAuthHeaders() });
  }

  getMenuItems(): Observable<MenuItemModel[]> { // Specify the return type and correct model
    return this.http.get<MenuItemModel[]>(this.menuApiUrl, { headers: this.getAuthHeaders() });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}