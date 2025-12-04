import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../../data.service';
import { CartService } from '../../../cart.service';

declare var Razorpay: any;

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  description?: string;
  type: 'upi' | 'card' | 'credits' | 'netbanking' | 'cod' | 'payu' | 'razorpay';
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PaymentComponent implements OnInit {
  totalPrice: number = 0;
  selectedMethodId: string = 'upi';
  isProcessing: boolean = false;
  userCredits: number = 0;

  paymentMethods: PaymentMethod[] = [
    { id: 'upi', name: 'UPI', icon: 'fas fa-mobile-alt', description: 'Google Pay, PhonePe, Paytm', type: 'upi' },
    { id: 'cards', name: 'Credit & Debit Cards', icon: 'far fa-credit-card', description: 'Visa, Mastercard, RuPay', type: 'card' },
    { id: 'credits', name: 'Credits', icon: 'fas fa-coins', description: 'Use your Zomato Credits', type: 'credits' },
    { id: 'netbanking', name: 'Netbanking', icon: 'fas fa-university', description: 'All major banks', type: 'netbanking' },
    { id: 'cod', name: 'Cash on Delivery', icon: 'fas fa-money-bill-wave', description: 'Pay at your doorstep', type: 'cod' },
    { id: 'razorpay', name: 'Razorpay', icon: 'fas fa-wallet', description: 'Pay securely with Razorpay', type: 'razorpay' }
  ];

  // UPI Data
  upiApps = [
    { id: 'gpay', name: 'Google Pay', icon: 'assets/gpay.png' },
    { id: 'phonepe', name: 'PhonePe', icon: 'assets/phonepe.png' },
    { id: 'paytm', name: 'Paytm', icon: 'assets/paytm.png' }
  ];
  selectedUpiApp: string = '';
  upiId: string = '';

  // Card Data
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  nameOnCard: string = '';

  constructor(private router: Router, private dataService: DataService, private cartService: CartService) { }

  ngOnInit(): void {
    this.totalPrice = this.cartService.getTotalPrice();
    this.dataService.userCredits$.subscribe(credits => {
      this.userCredits = credits;
    });
  }

  selectMethod(methodId: string): void {
    this.selectedMethodId = methodId;
  }

  selectUpiApp(appId: string): void {
    this.selectedUpiApp = appId;
  }

  // Pay with Credits
  payWithCredits(): void {
    if (this.userCredits < this.totalPrice) {
      alert('Insufficient credits! Please choose another payment method.');
      return;
    }

    this.isProcessing = true;
    setTimeout(() => {
      const success = this.dataService.deductCredits(this.totalPrice);
      this.isProcessing = false;

      if (success) {
        alert(`Payment Successful! ₹${this.totalPrice} deducted from your credits.`);
        this.router.navigate(['/profile/orders']);
      } else {
        alert('Transaction failed. Please try again.');
      }
    }, 1500);
  }

  // Simulate PayU Money Payment Flow
  payWithPayU(): void {
    if (!this.upiId && !this.selectedUpiApp) {
      alert('Please select a UPI app or enter a valid UPI ID');
      return;
    }

    this.isProcessing = true;

    // Simulate redirection to PayU
    console.log('Initiating PayU transaction...');

    setTimeout(() => {
      // In a real scenario, this would be a form submit to PayU
      const payUUrl = 'https://test.payu.in/_payment';
      console.log(`Redirecting to ${payUUrl}...`);

      this.isProcessing = false;
      alert('Redirecting to PayU Money Secure Gateway...');

      // Simulate success callback
      setTimeout(() => {
        alert('Payment Successful via PayU!');
        this.router.navigate(['/profile/orders']);
      }, 1500);
    }, 1500);
  }

  processGenericPayment(): void {
    this.isProcessing = true;
    setTimeout(() => {
      this.isProcessing = false;
      alert('Payment Successful!');
      this.router.navigate(['/profile/orders']);
    }, 2000);
  }

  payWithRazorpay(): void {
    const options = {
      key: 'rzp_test_YOUR_KEY_HERE', // Replace with your actual test key
      amount: this.totalPrice * 100, // Amount is in currency subunits. Default currency is INR.
      currency: 'INR',
      name: 'Zomato Clone',
      description: 'Food Order Payment',
      image: 'https://b.zmtcdn.com/web_assets/b40b97e677bc7b2cae4583865ae74dd41585691142.png',
      handler: (response: any) => {
        console.log(response.razorpay_payment_id);
        alert('Payment Successful via Razorpay!');
        this.router.navigate(['/profile/orders']);
      },
      prefill: {
        name: 'Aryan',
        email: 'aryan@example.com',
        contact: '9999999999'
      },
      theme: {
        color: '#E23744'
      }
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
    rzp1.on('payment.failed', (response: any) => {
      alert('Payment Failed');
      console.error(response.error);
    });
  }
}
