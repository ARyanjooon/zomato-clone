import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule, RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from './cart.service';
import { DataService } from './data.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [CommonModule, LoginComponent, SignupComponent, RouterModule, RouterOutlet, FormsModule]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'zomato-clone';
  isLoginModalOpen = false;
  isSignupModalOpen = false;
  activeOption: string = 'dining';
  searchQuery: string = '';
  cartItemCount: number = 0;
  backendMessage: string = '';
  private routerSubscription: Subscription | null = null;
  private cartSubscription: Subscription | null = null;

  constructor(private router: Router, private cartService: CartService, private dataService: DataService) {}

  ngOnInit(): void {
    this.updateActiveOptionFromRoute();
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateActiveOptionFromRoute();
      });

    this.cartSubscription = this.cartService.cartItems$.subscribe(() => {
      this.cartItemCount = this.cartService.getItemCount();
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  openLoginModal(): void {
    this.isLoginModalOpen = true;
  }

  closeLoginModal(): void {
    this.isLoginModalOpen = false;
  }

  openSignupModal(): void {
    this.isSignupModalOpen = true;
  }

  closeSignupModal(): void {
    this.isSignupModalOpen = false;
  }

  onOpenLoginFromSignup(): void {
    this.closeSignupModal();
    this.openLoginModal();
  }

  onOpenSignupFromLogin(): void {
    this.closeLoginModal();
    this.openSignupModal();
  }

  setActive(option: string): void {
    if (!option) {
      console.error('Option is required');
      return;
    }

    this.activeOption = option;
    const routeMap: { [key: string]: string } = {
      'delivery': '/delivery',
      'nightlife': '/nightlife',
      'dining': '/dining'
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
    } else if (currentUrl.includes('/dining') || currentUrl === '/') {
      this.activeOption = 'dining';
    }
  }

  isProfileRoute(): boolean {
    return this.router.url.includes('/profile');
  }

  isRestaurantRoute(): boolean {
    return ['/burgar', '/biryani', '/taj'].includes(this.router.url);
  }

  isAuthRoute(): boolean {
    return ['/login', '/signup'].includes(this.router.url);
  }

  onSearch(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: this.searchQuery.trim() } });
    }
  }

  navigateToCart(): void {
    this.router.navigate(['/profile/cart']);
  }

  testBackend(): void {
    this.dataService.getData().subscribe({
      next: (response) => {
        this.backendMessage = response.message;
      },
      error: (error) => {
        this.backendMessage = 'Error connecting to backend: ' + error.message;
      }
    });
  }
}
