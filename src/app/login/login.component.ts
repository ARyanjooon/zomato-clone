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

  phoneNumber = '';
  isLoading = false;
  errorMessage = '';

  constructor(private http: HttpClient) {}

  closeModal(): void {
    this.close.emit();
    this.resetForm();
  }

  onSignupClick(): void {
    this.openSignup.emit();
  }

  resetForm(): void {
    this.loginData = { email: '', password: '' };
    this.phoneNumber = '';
    this.errorMessage = '';
    this.isLoading = false;
  }

  onLogin(): void {
    this.errorMessage = '';
    
    if (!this.loginData.email || !this.loginData.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.isLoading = true;
    this.http.post('http://localhost:62195/api/auth/login', this.loginData).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        // alert('Login successful!'); // Removed alert for better UX
        console.log('Login response:', response);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.closeModal();
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.error || 'Login failed. Please try again.';
        console.error('Login error:', error);
      }
    });
  }
}
