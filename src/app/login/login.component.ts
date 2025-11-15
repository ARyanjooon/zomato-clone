import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @Output() close = new EventEmitter<void>();
  @Output() openSignup = new EventEmitter<void>();

  loginData = {
    email: '',
    password: ''
  };

  constructor(private http: HttpClient) {}

  closeModal(): void {
    this.close.emit();
  }

  onSignupClick(): void {
    this.openSignup.emit();
  }

  onLogin(): void {
    if (!this.loginData.email || !this.loginData.password) {
      alert('Please fill in all fields');
      return;
    }

    this.http.post('http://localhost:62195/api/auth/login', this.loginData).subscribe({
      next: (response: any) => {
        alert('Login successful!');
        console.log('Login response:', response);
        // Store user data in localStorage or service
        localStorage.setItem('user', JSON.stringify(response.user));
        this.closeModal();
      },
      error: (error) => {
        alert('Login failed: ' + error.error.error);
        console.error('Login error:', error);
      }
    });
  }
}
