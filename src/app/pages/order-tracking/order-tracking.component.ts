import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-order-tracking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.css']
})
export class OrderTrackingComponent {
  orders = [
    {
      id: 'ORD123',
      status: 'Preparing',
      eta: '20 mins'
    },
    {
      id: 'ORD124',
      status: 'Out for Delivery',
      eta: '10 mins'
    },
    {
      id: 'ORD125',
      status: 'Delivered',
      eta: '-'
    }
  ];
}