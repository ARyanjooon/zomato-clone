import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, CartComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  activeTab: string = 'cart';
  credits: number = 0;

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    // Set default active tab based on current route
    this.updateActiveTabFromRoute();

    // Subscribe to credits
    this.dataService.userCredits$.subscribe(credits => {
      this.credits = credits;
    });
  }

  setActiveTab(tab: string): void {
    if (!tab) {
      console.error('Tab is required');
      return;
    }

    this.activeTab = tab;
    const routeMap: { [key: string]: string } = {
      'cart': '/profile/cart',
      'orders': '/profile/orders',
      'favorites': '/profile/favorites',
      'settings': '/profile/settings'
    };

    const route = routeMap[tab];
    if (route) {
      this.router.navigate([route]);
    } else {
      console.warn(`No route defined for tab: ${tab}`);
    }
  }

  private updateActiveTabFromRoute(): void {
    const currentUrl = this.router.url;
    if (currentUrl.includes('/cart')) {
      this.activeTab = 'cart';
    } else if (currentUrl.includes('/orders')) {
      this.activeTab = 'orders';
    } else if (currentUrl.includes('/favorites')) {
      this.activeTab = 'favorites';
    } else if (currentUrl.includes('/settings')) {
      this.activeTab = 'settings';
    } else {
      this.activeTab = 'cart'; // Default
    }
  }
}


