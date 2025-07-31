import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Article, CartItem } from '../models/article.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItems.asObservable();

  addToCart(article: Article, quantity: number = 1): void {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find(item => item.article.id === article.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      currentItems.push({ article, quantity });
    }

    this.cartItems.next([...currentItems]);
  }

  removeFromCart(articleId: number): void {
    const currentItems = this.cartItems.value.filter(item => item.article.id !== articleId);
    this.cartItems.next(currentItems);
  }

  updateQuantity(articleId: number, quantity: number): void {
    const currentItems = this.cartItems.value;
    const item = currentItems.find(item => item.article.id === articleId);
    
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(articleId);
      } else {
        item.quantity = quantity;
        this.cartItems.next([...currentItems]);
      }
    }
  }

  clearCart(): void {
    this.cartItems.next([]);
  }

  getTotalPrice(): number {
    return this.cartItems.value.reduce((total, item) => {
      const price = item.article.fullPrice * (1 - item.article.discountPercent);
      return total + (price * item.quantity);
    }, 0);
  }

  getTotalItems(): number {
    return this.cartItems.value.reduce((total, item) => total + item.quantity, 0);
  }
}
