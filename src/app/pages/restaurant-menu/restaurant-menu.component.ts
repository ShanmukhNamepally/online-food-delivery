import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { MenuItem as MenuItemModel } from '../../../Models/menu-item.model';
import { OrderItemsService } from '../../services/order-items.service';
import { OrderItem } from '../../../Models/order-items.model';

@Component({
  selector: 'app-restaurant-menu',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './restaurant-menu.component.html',
  styleUrls: ['./restaurant-menu.component.css']
})
export class RestaurantMenuComponent implements OnInit {
  menuItems: MenuItemModel[] = [];

  constructor(private orderItemsService: OrderItemsService, private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.orderItemsService.getMenuItems().subscribe((items: MenuItemModel[]) => {
      this.menuItems = items;
      this.updateMenuItemsCartStatus();
    }, error => {
      console.error('Error fetching menu items:', error);
    });

    this.cartService.getCartItems().subscribe((items: OrderItem[]) => {
      this.cartService.cartItems = items;
      this.updateMenuItemsCartStatus();
    }, error => {
      console.error('Error fetching cart items:', error);
    });
  }

  updateMenuItemsCartStatus(): void {
    const customerId = this.cartService.getCustomerId();
    if (customerId !== null) {
      this.menuItems.forEach(item => {
        item.addedToCart = this.cartService.isItemInCart(item.itemID, customerId);
      });
    }
  }

  addToCart(item: MenuItemModel) {
    const customerId = this.cartService.getCustomerId();
    if (customerId === null) {
      console.error('Customer ID is null');
      return;
    }

    if (this.cartService.isItemInCart(item.itemID, customerId)) {
      console.log('Item already added to cart');
      alert('Item already added to cart');
      return;
    }

    let orderItem: OrderItem = {
      orderItemID: 0,
      name: item.name,
      customerID: customerId,
      orderID: 5,
      itemID: item.itemID,
      quantity: 1,
      price: item.price
    };

    this.orderItemsService.addToCart(orderItem).subscribe({
      next: (data) => {
        console.log("Item added to cart", data);
        item.addedToCart = true; // Update the flag if needed
        this.cartService.cartItems.push(orderItem); // Add the item to the service's cartItems array
      },
      error: (err) => {
        console.log("Error adding item to cart", err);
      }
    });
  }

  goToCart() {
    this.cartService.getCartItems().subscribe((items: OrderItem[]) => {
      this.router.navigate(['/cart']);
    });
  }
}
