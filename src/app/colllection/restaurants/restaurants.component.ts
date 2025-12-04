import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Restaurant } from '../../search/search.component';

@Component({
  selector: 'app-restaurants',
  imports: [CommonModule],
  templateUrl: './restaurants.component.html',
  styleUrl: './restaurants.component.scss'
})
export class RestaurantsComponent {
  constructor(private router: Router) { }

  restaurants: any[] = [
    {
      name: 'Taj Mahal Restaurant',
      rating: 4.5,
      cuisine: 'North Indian, Mughlai',
      image: 'https://b.zmtcdn.com/data/pictures/3/19043863/c16502d7cab17dabc970d66d11089ef5_o2_featured_v2.jpg?output-format=webp',
      offer: 'Pro extra 10% OFF',
      distance: '2.5 km',
      cost: '₹1200 for two',
      location: 'Connaught Place, New Delhi'
    },
    {
      name: 'Burger Singh',
      rating: 4.2,
      cuisine: 'Burger, Fast Food',
      image: 'https://b.zmtcdn.com/data/pictures/2/20683652/f50bcb1e06b0c6bf39ef7e3f4397b144_o2_featured_v2.jpg',
      offer: 'Flat 20% OFF',
      distance: '3.1 km',
      cost: '₹400 for two',
      location: 'Sector 18, Noida'
    },
    {
      name: 'Biryani House',
      rating: 4.7,
      cuisine: 'Biryani, Hyderabadi',
      image: 'https://b.zmtcdn.com/data/pictures/9/20479979/8c224a6c10a6dc2f773833ea3e5a2185_o2_featured_v2.jpg',
      offer: '',
      distance: '1.8 km',
      cost: '₹600 for two',
      location: 'Karol Bagh, New Delhi'
    },
    {
      name: 'Curry Corner',
      rating: 4.0,
      cuisine: 'South Indian',
      image: 'https://b.zmtcdn.com/data/pictures/6/19048776/6c51d988e957a96d9071af8fb528d555_o2_featured_v2.jpg',
      offer: 'Free Delivery',
      distance: '4.0 km',
      cost: '₹300 for two',
      location: 'Laxmi Nagar, New Delhi'
    },
    {
      name: 'Samrat Restaurant',
      rating: 4.3,
      cuisine: 'Chinese, Asian',
      image: 'https://b.zmtcdn.com/data/pictures/7/19047477/1bd1be3496f6a2f3bc07271a7d59c082_o2_featured_v2.jpg',
      offer: 'Pro 15% OFF',
      distance: '5.2 km',
      cost: '₹900 for two',
      location: 'Chanakyapuri, New Delhi'
    },
    {
      name: 'Dosa Delight',
      rating: 4.6,
      cuisine: 'South Indian',
      image: 'https://b.zmtcdn.com/data/pictures/3/19836763/511235899bf6bfb171631ab6c5e19559_o2_featured_v2.jpg',
      offer: '',
      distance: '0.9 km',
      cost: '₹250 for two',
      location: 'Saket, New Delhi'
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
    }
  }
}
