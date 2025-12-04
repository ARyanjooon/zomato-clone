import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  @Output() close = new EventEmitter<void>();
  @Output() openLogin = new EventEmitter<void>();

  signupData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  showPassword = false;
  showConfirmPassword = false;
  isLoading = false;
  errorMessage = '';

  constructor() { }

  closeModal(): void {
    this.close.emit();
    this.resetForm();
  }

  onLoginClick(): void {
    this.openLogin.emit();
  }

  resetForm(): void {
    this.signupData = { name: '', email: '', password: '', confirmPassword: '' };
    this.errorMessage = '';
    this.isLoading = false;
    this.showPassword = false;
    this.showConfirmPassword = false;
  }

  onSignup(): void {
    this.errorMessage = '';

    if (!this.signupData.name || !this.signupData.email || !this.signupData.password || !this.signupData.confirmPassword) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    if (this.signupData.password !== this.signupData.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    if (this.signupData.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters long';
      return;
    }

    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
      alert('Signup successful! Please login.');
      console.log('Signup response:', { message: 'Success', user: this.signupData });
      this.closeModal();
      this.openLogin.emit(); // Automatically open login after signup
    }, 1500);
  }
}
