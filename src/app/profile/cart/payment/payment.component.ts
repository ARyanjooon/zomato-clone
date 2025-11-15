import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

declare var Razorpay: any;

@Component({
  selector: 'app-payment',
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {
  totalPrice: number = 0;
  selectedPaymentMethod: string = 'credit-card';
  selectedUpiApp: string = 'g-pay'; // Default to G-Pay
  paymentForm = {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  };

  constructor(private cartService: CartService, private http: HttpClient) {}

  ngOnInit() {
    this.totalPrice = this.cartService.getTotalPrice();
  }

  togglePaymentMethod(method: string) {
    if (this.selectedPaymentMethod === method) {
      this.selectedPaymentMethod = '';
    } else {
      this.selectedPaymentMethod = method;
    }
  }

  onSubmit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user._id) {
      alert('Please login to place an order');
      return;
    }

    const orderData = {
      userId: user._id,
      items: this.cartService.cartItems.value,
      total: this.totalPrice
    };

    this.http.post('http://localhost:62195/api/orders', orderData).subscribe({
      next: (response: any) => {
        alert('Order placed successfully!');
        console.log('Order response:', response);
        this.cartService.clearCart();
        // Handle payment based on method
        if (this.selectedPaymentMethod === 'upi') {
          this.initiateUpiPayment();
        } else {
          alert(`Payment processed successfully using ${this.getPaymentMethodDisplayName()}! Total: ₹${this.totalPrice}`);
        }
      },
      error: (error) => {
        alert('Failed to place order: ' + error.error.error);
        console.error('Order error:', error);
      }
    });
  }

  initiateUpiPayment() {
    const options = {
      key: 'rzp_test_your_test_key_here', // Replace with your Razorpay test key
      amount: this.totalPrice * 100, // Amount in paisa
      currency: 'INR',
      name: 'Zomato Clone',
      description: 'Food Order Payment',
      image: 'https://example.com/logo.png', // Optional logo
      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com',
        contact: '9999999999'
      },
      notes: {
        address: 'Customer Address'
      },
      theme: {
        color: '#3399cc'
      },
      method: {
        upi: {
          preferred_apps: [this.selectedUpiApp === 'g-pay' ? 'tez' : this.selectedUpiApp === 'phonepe' ? 'phonepe' : 'paytm']
        }
      },
      handler: (response: any) => {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        // Handle success, e.g., clear cart, redirect to order confirmation
      },
      modal: {
        ondismiss: () => {
          alert('Payment cancelled by user.');
        }
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();
  }

  getPaymentMethodMessage(): string {
    switch (this.selectedPaymentMethod) {
      case 'upi':
        return `You will be redirected to ${this.getUpiAppDisplayName()} for payment.`;
      case 'net-banking':
        return 'You will be redirected to your bank\'s website for payment.';
      case 'wallet':
        return 'You will be redirected to your wallet app for payment.';
      case 'cash-on-delivery':
        return 'Payment will be collected upon delivery.';
      default:
        return '';
    }
  }

  getPaymentMethodDisplayName(): string {
    switch (this.selectedPaymentMethod) {
      case 'credit-card':
        return 'Credit/Debit Card';
      case 'upi':
        return `${this.getUpiAppDisplayName()} UPI`;
      case 'net-banking':
        return 'Net Banking';
      case 'wallet':
        return 'Wallet';
      case 'cash-on-delivery':
        return 'Cash on Delivery';
      default:
        return 'Unknown';
    }
  }

  getUpiAppDisplayName(): string {
    switch (this.selectedUpiApp) {
      case 'g-pay':
        return 'Google Pay';
      case 'phonepe':
        return 'PhonePe';
      case 'paytm':
        return 'Paytm';
      default:
        return 'UPI App';
    }
  }
}
