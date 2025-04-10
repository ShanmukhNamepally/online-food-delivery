import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  adminName = 'Admin';
 
  constructor(private router: Router) {}
 
  manageMenu() {
    this.router.navigate(['/restaurant-menu']);
  }
 
  viewOrders() {
    this.router.navigate(['/order-tracking']);
  }
 
  handlePayments() {
    this.router.navigate(['/payment-page']);
  }
}