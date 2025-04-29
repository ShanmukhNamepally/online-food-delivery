import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms'; // Import NgForm for template-driven forms
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';

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
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.cartService.getCartItems().subscribe(cartItems => {
      this.amount = this.cartService.getTotal(cartItems);
    });
  }

  onPay(paymentForm: NgForm) {
    if (paymentForm.valid) {
      this.processingPayment = true;
      setTimeout(() => {
        this.processingPayment = false;
        this.paymentProcessed = true;

        // Get cart items from local storage
        const storedCartItems = this.cartService.getCartItemsFromLocalStorage();
        console.log('Stored Cart Items:', storedCartItems);

        // Map the stored cart items to the format expected by placeOrder
        const orderItems = storedCartItems.map(item => ({
          productName: item.name,
          unitPrice: item.price,
          quantity: item.quantity
        }));
        console.log('Order Items to be placed:', orderItems);

        const order = { items: orderItems };

        this.orderService.placeOrder(order).subscribe(() => {
          // Clear the cart after placing the order
          this.cartService.clearCart();
          setTimeout(() => {
            this.router.navigate(['/customer-dashboard']);
          }, 1500);
        });
      }, 2000);
    } else {
      // If the form is invalid, display an error message or handle it as needed.
      alert('Please fill in all required payment details.');
    }
  }
}