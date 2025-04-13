import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from '../../Models/restaurants.model';
import { RestaurantService } from '../restaurant-service.service';
import { CommonModule } from '@angular/common'; 


@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css'],
  standalone: true,
  imports: [CommonModule] 

})
export class RestaurantListComponent implements OnInit {
  restaurants: Restaurant[] = [];

  constructor(private restaurantService: RestaurantService, private router: Router) {}

  ngOnInit(): void {
    this.restaurantService.getRestaurants().subscribe(data => {
     this.restaurants = data;
    });
  }

  viewMenu(): void {
    this.router.navigate(['/restaurant-menu']);
  }
}
