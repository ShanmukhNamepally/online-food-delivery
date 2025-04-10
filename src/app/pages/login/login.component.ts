import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { response } from 'express';
 
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
 
  constructor(private router: Router,private authService:AuthService) {}
 
  onLogin() {
    let credentials={'emailAddress':this.username,'password':this.password};
    this.authService.login(credentials).subscribe(
      response => {
      this.authService.saveToken(response.token)
      this.router.navigate(['/'])
      
      console.log('logged in successfully');
      this.router.navigate(['/customer-dashboard']);
      }

  
  );
    
  }
}