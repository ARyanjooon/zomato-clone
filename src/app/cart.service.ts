import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface MenuItem {
  name: string;
  price: number;
  description: string;
  image?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems = new BehaviorSubject<MenuItem[]>([]);
  cartItems$: Observable<MenuItem[]> = this.cartItems.asObservable();

  addToCart(item: MenuItem): void {
    if (!item || !item.name || item.price <= 0) {
      console.error('Invalid item:', item);
      return;
    }
    const currentItems = this.cartItems.value;
    this.cartItems.next([...currentItems, item]);
  }

  removeFromCart(index: number): void {
    const currentItems = this.cartItems.value;
    if (index >= 0 && index < currentItems.length) {
      currentItems.splice(index, 1);
      this.cartItems.next([...currentItems]);
    } else {
      console.error('Invalid index for removal:', index);
    }
  }

  clearCart(): void {
    this.cartItems.next([]);
  }

  getTotalPrice(): number {
    return this.cartItems.value.reduce((total, item) => total + item.price, 0);
  }

  getItemCount(): number {
    return this.cartItems.value.length;
  }

  isEmpty(): boolean {
    return this.cartItems.value.length === 0;
  }
}
