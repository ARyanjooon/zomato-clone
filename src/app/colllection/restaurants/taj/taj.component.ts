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
  selector: 'app-taj',
  imports: [CommonModule],
  templateUrl: './taj.component.html',
  styleUrl: './taj.component.scss'
})
export class TajComponent {
  restaurant = {
    name: 'Taj Mahal Restaurant',
    rating: 4.5,
    cuisine: 'Indian',
    image: 'https://b.zmtcdn.com/data/pictures/3/19043863/c16502d7cab17dabc970d66d11089ef5_o2_featured_v2.jpg?output-format=webp',
    description: 'Experience the rich flavors of India at Taj Mahal Restaurant. Our authentic dishes are prepared with traditional recipes passed down through generations, using the finest spices and ingredients.',
    menu: [
      { name: 'Butter Chicken', price: 250, description: 'Tender chicken cooked in a creamy tomato-based curry.', image: 'https://th.bing.com/th/id/OIP.H_tASg9vrJqSELBSmIhXyAHaLH?w=204&h=306&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3' },
      { name: 'Paneer Tikka Masala', price: 220, description: 'Cubes of paneer marinated and cooked in a spicy gravy.', image: 'https://th.bing.com/th/id/OIP._md1j4yX1X6tDFp0H2h3xgHaJ4?w=208&h=277&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3' },
      { name: 'Biryani', price: 180, description: 'Fragrant basmati rice cooked with meat, spices, and saffron.', image: 'https://th.bing.com/th/id/OIP.CMV98hR5u-F4o_B_yPT7zgHaE8?w=265&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3' },
      { name: 'Naan', price: 40, description: 'Soft and fluffy Indian bread baked in a tandoor.', image: 'https://th.bing.com/th/id/OIP.CPLhAVF8Ze3ktj9qWEogGgHaHa?w=208&h=277&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3' },
      { name: 'Gulab Jamun', price: 80, description: 'Sweet dumplings soaked in rose-flavored syrup.', image: 'https://th.bing.com/th/id/OIP.KeI2UV4X01HLASoBWij6lQHaK2?w=125&h=183&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3' }
    ] as MenuItem[]
  };

  constructor(private cartService: CartService) {}

  addToCart(item: MenuItem) {
    this.cartService.addToCart(item);
    alert(`${item.name} added to cart!`);
  }
}
