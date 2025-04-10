import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
 
interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
}
 
@Component({
  selector: 'app-restaurant-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './restaurant-menu.component.html',
  styleUrls: ['./restaurant-menu.component.css']
})
export class RestaurantMenuComponent {
  menuItems: MenuItem[] = [
    { id: 1, name: 'Pizza Margherita', description: 'Classic cheese and tomato pizza', price: 250 },
    { id: 2, name: 'Veg Burger', description: 'Loaded with fresh veggies', price: 120 },
    { id: 3, name: 'Pasta Alfredo', description: 'Creamy white sauce pasta', price: 200 }
  ];

  constructor(private router: Router){}
 
  addItemToCart(item: MenuItem) {
alert(`${item.name} added to cart!`);
  }

  GoToCart(){
    this.router.navigate(['/cart'])
  }
}