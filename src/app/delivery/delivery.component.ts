import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

export interface InspirationItem {
  name: string;
  image: string;
  description: string;
}

@Component({
  selector: 'app-delivery',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.scss'
})
export class DeliveryComponent implements OnInit, OnDestroy {
  @ViewChild('inspirationGrid', { static: false }) inspirationGrid!: ElementRef;
  activeOption: string = 'delivery';
  isFilterModalOpen = false;
  activeFilterCategory = 'sort';
  sortBy = 'popularity'; // Default sort option
  cuisineSearchTerm = '';
  selectedRating: number = 0; // 0 for 'Any'
  private routerSubscription: Subscription | null = null;

  inspirationItems: InspirationItem[] = [
    { name: 'Pizza', image: 'https://static.vecteezy.com/system/resources/previews/022/994/042/non_2x/the-pepperoni-pizza-and-a-piece-of-streched-cheese-pizza-with-ai-generated-free-photo.jpg', description: 'Cheesy and delicious pizzas' },
    { name: 'Biryani', image: 'https://th.bing.com/th/id/OIP.MnjkS72gcWWDOTfoiUB3tAHaE8?w=251&h=180&c=7&r=0&o=7&cb=12&dpr=1.3&pid=1.7&rm=3', description: 'Aromatic rice dishes' },
    { name: 'Burger', image: 'https://th.bing.com/th/id/OIP.1tn0Vuas7cadHUWDak2kjwHaHa?w=190&h=191&c=7&r=0&o=7&cb=12&dpr=1.3&pid=1.7&rm=3', description: 'Juicy burgers for all' },
    { name: 'Cake', image: 'https://th.bing.com/th/id/OIP.e-DP665fTi3PMhVhKKk8CgHaI_?w=208&h=253&c=7&r=0&o=7&cb=12&dpr=1.3&pid=1.7&rm=3', description: 'Sweet treats and desserts' },
    { name: 'Rolls', image: 'https://th.bing.com/th/id/OIP.MGK-m7ZLol0YF5oFtHxftgHaFS?w=256&h=183&c=7&r=0&o=7&cb=12&dpr=1.3&pid=1.7&rm=3', description: 'Savory rolls and wraps' },
    { name: 'Chicken', image: 'https://th.bing.com/th/id/OIP.E_wqhR0vnrtEAkEfWvoqmwHaE8?w=208&h=139&c=7&r=0&o=7&cb=12&dpr=1.3&pid=1.7&rm=3', description: 'Tender chicken dishes' },
    { name: 'North Indian', image: 'https://th.bing.com/th/id/OIP.RSoknCWE1TQ14yqQUf-ELwHaFj?w=227&h=150&c=6&o=7&cb=12&dpr=1.3&pid=1.7&rm=3', description: 'Hearty North Indian cuisine' },
    { name: 'Thali', image: 'https://th.bing.com/th/id/OIP._Lpele1Fw_kdedHe8zW8RwHaG0?w=186&h=180&c=7&r=0&o=7&cb=12&dpr=1.3&pid=1.7&rm=3', description: 'Complete and wholesome thalis' },
    { name: 'Momos', image: 'https://th.bing.com/th/id/OIP.oyaRq9NBT_LEC7HUt2zbIwHaEK?w=315&h=180&c=7&r=0&o=7&cb=12&dpr=1.3&pid=1.7&rm=3', description: 'Steamed and fried dumplings' },
    { name: 'Veg Meal', image: 'https://th.bing.com/th/id/OIP.k4Gpt9BtHE_FbwqH82iTaAHaLH?w=204&h=306&c=7&r=0&o=7&cb=12&dpr=1.3&pid=1.7&rm=3', description: 'Delicious vegetarian meals' },
    { name: 'Sweets', image: 'https://th.bing.com/th/id/OIP.4laPgmfxcCXopzX8ZucHDgHaE8?w=272&h=182&c=7&r=0&o=7&cb=12&dpr=1.3&pid=1.7&rm=3', description: 'A variety of Indian sweets' },
    { name: 'Noodles', image: 'https://th.bing.com/th/id/OIP.gcV0jdZvzGKj5Q7BaujzQQHaHa?w=208&h=208&c=7&r=0&o=7&cb=12&dpr=1.3&pid=1.7&rm=3', description: 'Slurp-worthy noodles' }
  ];

  constructor(private router: Router) {}

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
      'dining': '/',
      'nightlife': '/nightlife'
    };

    const route = routeMap[option];
    if (route) {
      this.router.navigate([route]);
    } else {
      console.warn(`No route defined for option: ${option}`);
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
    // In a real app, you would apply the filter logic here
    console.log('Applying filters with sort by:', this.sortBy, 'and rating:', this.selectedRating);
    this.closeFilterModal();
  }

  clearFilters(): void {
    this.sortBy = 'popularity'; // Reset to default
    this.activeFilterCategory = 'sort';
    this.cuisineSearchTerm = '';
    this.selectedRating = 0;
  }

  scrollInspiration(direction: 'prev' | 'next'): void {
    if (!this.inspirationGrid) {
      console.error('Inspiration grid not available');
      return;
    }

    const grid = this.inspirationGrid.nativeElement as HTMLElement;
    const firstCard = grid.querySelector('.inspiration-item') as HTMLElement;
    if (firstCard) {
      // Calculate the width of one card plus its margin/gap
      const scrollAmount = firstCard.offsetWidth + 40; // The gap is 40px as defined in the SCSS
      grid.scrollBy({ left: direction === 'next' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
    }
  }
}
