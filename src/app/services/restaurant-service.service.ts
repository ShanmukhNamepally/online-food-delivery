import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../../Models/restaurants.model';
import { MenuItem } from '../../Models/menu-item.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private apiUrl = 'http://localhost:5288/api/Restaurant';

  constructor(private http: HttpClient, private authService: AuthService) {}
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.apiUrl,{ headers: this.getAuthHeaders() });
  }

  getRestaurantMenu(restaurantId: number): Observable<{ restaurantName: string, menuItems: MenuItem[] }> {
    return this.http.get<{ restaurantName: string, menuItems: MenuItem[] }>(`${this.apiUrl}/${restaurantId}/menu`,{ headers: this.getAuthHeaders() });
  }
}
