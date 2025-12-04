import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantsComponent } from '../colllection/restaurants/restaurants.component';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dining',
  standalone: true,
  imports: [CommonModule, RestaurantsComponent],
  templateUrl: './dining.component.html',
  styleUrl: './dining.component.scss'
})
export class DiningComponent implements OnInit, OnDestroy {
  @ViewChild('collectionsGrid', { static: false }) collectionsGrid!: ElementRef;
  activeOption: string = 'dining';
  private routerSubscription: Subscription | null = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Update active option based on current route
    this.updateActiveOptionFromRoute();
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  setActive(option: string): void {
    if (!option) {
      console.error('Option is required');
      return;
    }

    this.activeOption = option;
    const routeMap: { [key: string]: string } = {
      'delivery': '/delivery',
      'nightlife': '/nightlife'
    };

    const route = routeMap[option];
    if (route) {
      this.router.navigate([route]);
    } else {
      console.warn(`No route defined for option: ${option}`);
    }
  }

  isFilterModalOpen = false;
  activeFilterCategory = 'sort';
  sortBy = 'popularity';
  cuisineSearchTerm = '';
  selectedRating: number = 0;

  diningRestaurants = [
    {
      id: 1,
      name: 'Taj Mahal Restaurant',
      image: 'https://b.zmtcdn.com/data/pictures/3/19043863/c16502d7cab17dabc970d66d11089ef5_o2_featured_v2.jpg?output-format=webp',
      rating: 4.5,
      cuisine: 'North Indian, Mughlai',
      cost: '₹1200 for two',
      location: 'New Delhi',
      distance: '3.5 km',
      offer: 'Flat 20% OFF'
    },
    {
      id: 2,
      name: 'Burger Singh',
      image: 'https://b.zmtcdn.com/data/pictures/2/20683652/f50bcb1e06b0c6bf39ef7e3f4397b144_o2_featured_v2.jpg',
      rating: 4.2,
      cuisine: 'Burger, Fast Food',
      cost: '₹500 for two',
      location: 'Connaught Place',
      distance: '2.0 km',
      offer: 'Free Fries'
    },
    {
      id: 3,
      name: 'Biryani House',
      image: 'https://b.zmtcdn.com/data/pictures/9/20479979/8c224a6c10a6dc2f773833ea3e5a2185_o2_featured_v2.jpg',
      rating: 4.7,
      cuisine: 'Biryani, Hyderabadi',
      cost: '₹800 for two',
      location: 'Chandni Chowk',
      distance: '5.0 km',
      offer: ''
    },
    {
      id: 4,
      name: 'Curry Corner',
      image: 'https://b.zmtcdn.com/data/pictures/6/19048776/6c51d988e957a96d9071af8fb528d555_o2_featured_v2.jpg',
      rating: 4.0,
      cuisine: 'North Indian',
      cost: '₹600 for two',
      location: 'Lajpat Nagar',
      distance: '4.2 km',
      offer: '10% OFF'
    },
    {
      id: 5,
      name: 'Samrat Restaurant',
      image: 'https://b.zmtcdn.com/data/pictures/7/19047477/1bd1be3496f6a2f3bc07271a7d59c082_o2_featured_v2.jpg',
      rating: 4.3,
      cuisine: 'South Indian, North Indian',
      cost: '₹1000 for two',
      location: 'Chanakyapuri',
      distance: '6.0 km',
      offer: ''
    },
    {
      id: 6,
      name: 'Dosa Delight',
      image: 'https://b.zmtcdn.com/data/pictures/3/19836763/511235899bf6bfb171631ab6c5e19559_o2_featured_v2.jpg',
      rating: 4.6,
      cuisine: 'South Indian',
      cost: '₹400 for two',
      location: 'Karol Bagh',
      distance: '3.0 km',
      offer: 'Filter Coffee Free'
    }
  ];

  navigateToRestaurant(restaurantName: string): void {
    if (!restaurantName) {
      console.error('Restaurant name is required');
      return;
    }

    const routeMap: { [key: string]: string } = {
      'Taj Mahal Restaurant': '/taj',
      'Burger Singh': '/burgar',
      'Biryani House': '/biryani'
    };

    const route = routeMap[restaurantName];
    if (route) {
      this.router.navigate([route]);
    } else {
      console.warn(`No route defined for restaurant: ${restaurantName}`);
      // Optional: Navigate to a default detail page or show an alert
    }
  }

  private updateActiveOptionFromRoute(): void {
    const currentUrl = this.router.url;
    if (currentUrl.includes('/delivery')) {
      this.activeOption = 'delivery';
    } else if (currentUrl.includes('/nightlife')) {
      this.activeOption = 'nightlife';
    } else if (currentUrl === '/' || currentUrl.includes('/dining')) {
      this.activeOption = 'dining';
    }
  }

  openFilterModal(): void {
    this.isFilterModalOpen = true;
  }

  closeFilterModal(): void {
    this.isFilterModalOpen = false;
  }

  applyFilters(): void {
    console.log('Applying filters...');
    this.closeFilterModal();
  }

  clearFilters(): void {
    this.sortBy = 'popularity';
    this.activeFilterCategory = 'sort';
    this.cuisineSearchTerm = '';
    this.selectedRating = 0;
  }

  scrollCollections(direction: 'prev' | 'next'): void {
    if (!this.collectionsGrid) {
      console.error('Collections grid not available');
      return;
    }

    const grid = this.collectionsGrid.nativeElement as HTMLElement;
    const firstCard = grid.querySelector('.collection-card') as HTMLElement;
    if (firstCard) {
      // Calculate the width of one card plus the gap (20px)
      const scrollAmount = firstCard.offsetWidth + 20;
      grid.scrollBy({ left: direction === 'next' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
    }
  }
}
