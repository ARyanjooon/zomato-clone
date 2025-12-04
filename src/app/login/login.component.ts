import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  constructor() { }

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
    setTimeout(() => {
      this.isLoading = false;
      console.log('Login response:', { message: 'Success', user: { name: 'Test User', email: this.loginData.email } });
      localStorage.setItem('user', JSON.stringify({ name: 'Test User', email: this.loginData.email }));
      this.closeModal();
    }, 1500);
  }
}
