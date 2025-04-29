import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
 
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CustomerDashboardComponent } from './pages/customer-dashboard/customer-dashboard.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
//import { OrderTrackingComponent } from './pages/order-tracking/order-tracking.component';
import { PaymentPageComponent } from './pages/payment-page/payment-page.component';
import { RestaurantMenuComponent } from './pages/restaurant-menu/restaurant-menu.component';
import { AppComponent } from './app.component';
import { CartComponent } from './pages/cart/cart.component';
import { AuthGuard } from './auth.guard';
import { RestaurantListComponent } from './pages/restaurants/restaurants.component';
import { OrderHistoryComponent } from './pages/orderhistory/orderhistory.component';
 
export const routes: Routes = [
  { path: '', component:LoginComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'customer-dashboard', component: CustomerDashboardComponent ,canActivate: [AuthGuard]},
  { path: 'admin-dashboard', component: AdminDashboardComponent,canActivate: [AuthGuard] },
  //{ path: 'order-tracking', component: OrderTrackingComponent,canActivate: [AuthGuard] },
  { path: 'payment-page', component: PaymentPageComponent,canActivate: [AuthGuard] },
  { path: 'restaurant-menu', component: RestaurantMenuComponent,canActivate: [AuthGuard] },
  { path : 'cart', component: CartComponent,canActivate: [AuthGuard] },
  { path : 'restaurants', component: RestaurantListComponent},
  {path: 'order-history', component: OrderHistoryComponent, canActivate: [AuthGuard]}
];
 
export const appRoutes = provideRouter(routes);