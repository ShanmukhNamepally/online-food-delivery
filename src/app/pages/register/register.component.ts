import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  phone = '';
  address = '';
  roleId = 2;

  constructor(private router: Router, private http: HttpClient) {}

  onRegister() {
    const registrationData = {
      name: this.name,
      customerEmail: this.email,
      customerPassword: this.password,
      phone: this.phone,
      address: this.address,
      roleId: this.roleId
    };

    this.http.post('http://localhost:5288/api/Customers', registrationData)
      .subscribe(response => {
        alert('Registration successful!');
        this.router.navigate(['/login']);
      }, error => {
        alert('Registration failed!');
        console.error(error);
      });
  }
}
