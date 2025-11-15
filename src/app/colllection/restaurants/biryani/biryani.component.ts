import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, MenuItem } from '../../../cart.service';

@Component({
  selector: 'app-biryani',
  imports: [CommonModule],
  templateUrl: './biryani.component.html',
  styleUrl: './biryani.component.scss'
})
export class BiryaniComponent {
  restaurant = {
    name: 'Biryani House',
    rating: 4.6,
    cuisine: 'Indian',
    image: 'https://b.zmtcdn.com/data/pictures/9/20479979/8c224a6c10a6dc2f773833ea3e5a2185_o2_featured_v2.jpg',
    description: 'Welcome to Biryani House, where we specialize in authentic biryani dishes that bring the flavors of India to your table. Our biryanis are cooked with aromatic spices, tender meat, and fragrant basmati rice, creating a culinary experience that will transport you to the streets of Hyderabad.',
    menu: [
      { name: 'Chicken Biryani', price: 220, description: 'Fragrant basmati rice cooked with tender chicken, spices, and saffron.', image: 'https://images.unsplash.com/photo-1563379091339-03246963d4ae?w=120&h=90&fit=crop&crop=center' },
      { name: 'Mutton Biryani', price: 280, description: 'Slow-cooked mutton with spices, caramelized onions, and boiled eggs.', image: 'https://th.bing.com/th/id/OIP.CMV98hR5u-F4o_B_yPT7zgHaE8?w=265&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3' },
      { name: 'Paneer Biryani', price: 200, description: 'Vegetarian biryani with paneer, mixed vegetables, and aromatic spices.', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=120&h=90&fit=crop&crop=center' },
      { name: 'Raita', price: 50, description: 'Cool yogurt with cucumber, mint, and spices.', image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=120&h=90&fit=crop&crop=center' },
      { name: 'Salad', price: 40, description: 'Fresh mixed salad with tomatoes, onions, and lemon dressing.', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=120&h=90&fit=crop&crop=center' }
    ] as MenuItem[]
  };

  constructor(private cartService: CartService) {}

  addToCart(item: MenuItem): void {
    if (!item) {
      console.error('Item is required');
      return;
    }
    this.cartService.addToCart(item);
    alert(`${item.name} added to cart!`);
  }
}
