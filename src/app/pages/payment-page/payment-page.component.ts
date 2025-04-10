import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
 
@Component({
  selector: 'app-payment-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent {
  paymentMethod: string = '';
  cardNumber: string = '';
  cardName: string = '';
  expiryDate: string = '';
  cvv: string = '';
  amount: number = 199;
 
  onPay() {
    alert(`Payment of ₹${this.amount} is being processed...`);
  }
}