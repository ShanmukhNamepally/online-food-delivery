import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {
  paymentMethod: string = '';
  cardNumber: string = '';
  cardName: string = '';
  expiryDate: string = '';
  cvv: string = '';
  amount: number = 0;
  processingPayment: boolean = false;
  paymentProcessed: boolean = false;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.getCartItems().subscribe(cartItems => {
      this.amount = this.cartService.getTotal(cartItems);
    });
  }

  onPay() {
    this.processingPayment = true;
    setTimeout(() => {
      this.processingPayment = false;
      this.paymentProcessed = true;
      setTimeout(() => {
        this.router.navigate(['/customer-dashboard']);
      }, 1500);
    }, 2000);
  }
}