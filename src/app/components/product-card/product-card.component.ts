import { Component, Input } from '@angular/core';
import { Article } from '../../models/article.interface';
import { CartService } from '../../services/cart.service';
import { DecimalPipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [DecimalPipe, CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() article!: Article;

  constructor(private cartService: CartService) {}

  get discountedPrice(): number {
    return this.article.fullPrice * (1 - this.article.discountPercent);
  }

  get hasDiscount(): boolean {
    return this.article.discountPercent > 0;
  }

  addToCart(): void {
    this.cartService.addToCart(this.article);
  }
}
