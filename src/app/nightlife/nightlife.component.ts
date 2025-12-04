import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nightlife',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nightlife.component.html',
  styleUrl: './nightlife.component.scss'
})
export class NightlifeComponent implements OnInit, OnDestroy {
  @ViewChild('collectionsGrid', { static: false }) collectionsGrid!: ElementRef;
  activeOption: string = 'nightlife';
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
      'dining': '/'
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

  nightlifeRestaurants = [
    {
      id: 1,
      name: 'The Piano Man Jazz Club',
      image: 'https://b.zmtcdn.com/data/pictures/chains/2/308022/d813763e028020583485073167b57261_o2_featured_v2.jpg',
      rating: 4.6,
      cuisine: 'Jazz Bar, Italian',
      cost: '₹2000 for two',
      location: 'Safdarjung, New Delhi',
      distance: '3.2 km',
      offer: 'Live Music Tonight'
    },
    {
      id: 2,
      name: 'Summer House Cafe',
      image: 'https://b.zmtcdn.com/data/pictures/8/307498/0a87d18d859543346d03f0761d763875_o2_featured_v2.jpg',
      rating: 4.3,
      cuisine: 'Continental, Italian',
      cost: '₹2500 for two',
      location: 'Hauz Khas, New Delhi',
      distance: '4.5 km',
      offer: 'Happy Hour 4-8 PM'
    },
    {
      id: 3,
      name: 'Privee',
      image: 'https://b.zmtcdn.com/data/pictures/2/18246382/1c6c51c9c8d8c4c8d8c8c8c8c8c8c8c8_o2_featured_v2.jpg',
      rating: 4.1,
      cuisine: 'Finger Food, North Indian',
      cost: '₹3000 for two',
      location: 'Shangri-La\'s Eros Hotel, Connaught Place',
      distance: '6.0 km',
      offer: 'Ladies Night'
    },
    {
      id: 4,
      name: 'Toy Room',
      image: 'https://b.zmtcdn.com/data/pictures/4/19074744/4c4c4c4c4c4c4c4c4c4c4c4c4c4c4c4c_o2_featured_v2.jpg',
      rating: 4.0,
      cuisine: 'Finger Food, Continental',
      cost: '₹3500 for two',
      location: 'Aloft Hotel, Aerocity',
      distance: '12.0 km',
      offer: ''
    },
    {
      id: 5,
      name: 'Raasta',
      image: 'https://b.zmtcdn.com/data/pictures/chains/7/307497/7c7c7c7c7c7c7c7c7c7c7c7c7c7c7c7c_o2_featured_v2.jpg',
      rating: 4.4,
      cuisine: 'Caribbean, Continental',
      cost: '₹2200 for two',
      location: 'Green Park, New Delhi',
      distance: '3.8 km',
      offer: 'Reggae Night'
    },
    {
      id: 6,
      name: 'Social',
      image: 'https://b.zmtcdn.com/data/pictures/chains/2/309662/2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c_o2_featured_v2.jpg',
      rating: 4.5,
      cuisine: 'North Indian, Chinese',
      cost: '₹1500 for two',
      location: 'Hauz Khas Village, New Delhi',
      distance: '4.6 km',
      offer: '1+1 on Drinks'
    }
  ];

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
