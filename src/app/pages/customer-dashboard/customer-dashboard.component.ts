import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
 
@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent {
  customerName = 'Thella'; // static name for now
 
  constructor(private router: Router,private authService:AuthService) {}
 
  goToMenu() {
    this.router.navigate(['/restaurant-menu']);
  }
 
  goToOrders() {
    this.router.navigate(['/order-history']);
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

  logOut(){
    localStorage.removeItem('jwt_token');
    this.router.navigate(['/login'])
  }
  viewMenu(): void {
    this.router.navigate(['/restaurant-menu']);
  }
}