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
  constructor(private router: Router) {}

  restaurants: Restaurant[] = [
    { name: 'Taj Mahal Restaurant', rating: 4.5, cuisine: 'Indian', image: 'https://b.zmtcdn.com/data/pictures/3/19043863/c16502d7cab17dabc970d66d11089ef5_o2_featured_v2.jpg?output-format=webp' },
    { name: 'Burger Singh', rating: 4.2, cuisine: 'Indian', image: 'https://b.zmtcdn.com/data/pictures/2/20683652/f50bcb1e06b0c6bf39ef7e3f4397b144_o2_featured_v2.jpg' },
    { name: 'Biryani House', rating: 4.7, cuisine: 'Indian', image: 'https://b.zmtcdn.com/data/pictures/9/20479979/8c224a6c10a6dc2f773833ea3e5a2185_o2_featured_v2.jpg' },
    { name: 'Curry Corner', rating: 4.0, cuisine: 'Indian', image: 'https://b.zmtcdn.com/data/pictures/6/19048776/6c51d988e957a96d9071af8fb528d555_o2_featured_v2.jpg' },
    { name: 'Samrat Restaurant', rating: 4.3, cuisine: 'Indian', image: 'https://b.zmtcdn.com/data/pictures/7/19047477/1bd1be3496f6a2f3bc07271a7d59c082_o2_featured_v2.jpg' },
    { name: 'Dosa Delight', rating: 4.6, cuisine: 'Indian', image: 'https://b.zmtcdn.com/data/pictures/3/19836763/511235899bf6bfb171631ab6c5e19559_o2_featured_v2.jpg' }
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
