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
