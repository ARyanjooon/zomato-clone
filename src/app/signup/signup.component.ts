import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}

  closeModal(): void {
    this.close.emit();
  }

  onLoginClick(): void {
    this.openLogin.emit();
  }

  onSignup(): void {
    if (!this.signupData.name || !this.signupData.email || !this.signupData.password || !this.signupData.confirmPassword) {
      alert('Please fill in all fields');
      return;
    }

    if (this.signupData.password !== this.signupData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    this.http.post('http://localhost:62195/api/auth/register', this.signupData).subscribe({
      next: (response: any) => {
        alert('Signup successful! Please login.');
        console.log('Signup response:', response);
        this.closeModal();
      },
      error: (error) => {
        alert('Signup failed: ' + error.error.error);
        console.error('Signup error:', error);
      }
    });
  }
}
