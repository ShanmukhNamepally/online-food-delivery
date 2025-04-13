import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent {
  customerName = 'Thella'; // static name for now
 
  constructor(private router: Router) {}
 
  goToMenu() {
    this.router.navigate(['/restaurant-menu']);
  }
 
  goToOrders() {
    this.router.navigate(['/order-tracking']);
  }

  goToHome(){
    this.router.navigate(['/customer-dashboard']);
  }
 

  goToCart(){
    this.router.navigate(['/cart'])
  }
  goToRestaurant(){
    this.router.navigate(['/restaurants'])
  }
}