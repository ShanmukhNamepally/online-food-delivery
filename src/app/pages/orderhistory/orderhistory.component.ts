import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './orderhistory.component.html',
  styleUrls: ['./orderhistory.component.css']
})
export class OrderHistoryComponent implements OnInit {

  orderHistory: any[] = [];
  isLoggedIn = false;

  constructor(private orderService: OrderService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getAuthState().subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
      if (this.isLoggedIn) {
        this.loadOrderHistory();
      }
    });
  }

  loadOrderHistory(): void {
    this.orderHistory = this.orderService.getOrderHistory();
    this.orderHistory = this.sortAndUpdateOrders(this.orderHistory);
    console.log('Order History loaded and updated:', this.orderHistory); // For debugging
  }

  clearHistory(): void {
    this.orderService.clearOrderHistory();
    this.orderHistory = [];
  }

  sortAndUpdateOrders(orders: any[]): any[] {
    if (!orders || orders.length === 0) {
      return [];
    }

    // Sort orders by orderDate in descending order (latest first)
    const sortedOrders = orders.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());

    // Update the status of the orders
    if (sortedOrders.length > 0) {
      sortedOrders[0].status = 'Preparing';
      for (let i = 1; i < sortedOrders.length; i++) {
        sortedOrders[i].status = 'Delivered';
      }
    }

    return sortedOrders;
  }
}