import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../cart.service';

interface MenuItem {
  name: string;
  price: number;
  description: string;
  image?: string;
}

@Component({
  selector: 'app-burgar',
  imports: [CommonModule],
  templateUrl: './burgar.component.html',
  styleUrl: './burgar.component.scss'
})
export class BurgarComponent {
  restaurant = {
    name: 'Burgar Singh',
    rating: 4.7,
    cuisine: 'American',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&crop=center',
    description: 'Welcome to Burgar Singh, where we serve the juiciest, most flavorful burgers in town! Our burgers are made with premium ingredients, fresh buns, and a variety of toppings to satisfy every craving. From classic cheeseburgers to gourmet creations, we have something for everyone.',
    menu: [
      { name: 'Classic Cheeseburger', price: 150, description: 'Juicy beef patty with melted cheese, lettuce, tomato, and our special sauce.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=120&h=90&fit=crop&crop=center' },
      { name: 'Paneer Tikka Burger', price: 200, description: 'Paneer Tikka Burger is a fusion of Indian spices and classic fast food, featuring grilled paneer tikka patties.', image: 'https://th.bing.com/th/id/OIP.yd7ZueC4klGvqT1EjJwyLgHaFl?w=239&h=181&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3' },
      { name: 'Veggie Burger', price: 130, description: 'Plant-based patty with avocado, sprouts, tomato, and vegan mayo.', image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=120&h=90&fit=crop&crop=center' },
      { name: 'Chicken Burger', price: 160, description: 'Grilled chicken breast with lettuce, tomato, mayo, and pickles.', image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=120&h=90&fit=crop&crop=center' },
      { name: 'French Fries', price: 80, description: 'Crispy golden fries seasoned with sea salt.', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=120&h=90&fit=crop&crop=center' }
    ] as MenuItem[]
  };

  constructor(private cartService: CartService) {}

  addToCart(item: MenuItem) {
    this.cartService.addToCart(item);
    alert(`${item.name} added to cart!`);
  }
}
