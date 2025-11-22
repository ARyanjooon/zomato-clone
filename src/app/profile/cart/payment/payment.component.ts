import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PaymentComponent {
  totalPrice: number = 0;
  paymentMethod: string = 'credit-card';

  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  nameOnCard: string = '';

  constructor() {
    // Single constructor implementation; Add DI dependencies if needed.
  }

  onSubmit() {
    if (this.paymentMethod === 'credit-card') {
      alert(`Processing credit card payment for amount ₹${this.totalPrice}`);
      // Add actual payment processing logic here
    } else {
      alert('Please select a payment method');
    }
  }
}
