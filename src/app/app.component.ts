import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from "./pages/login/login.component";
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AuthService } from './auth.service';
 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "online food delivery";
  email: string | null = null;
  constructor(public authService: AuthService,private router:Router) {}
  logout()
  {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}