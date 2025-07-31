import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  cartItemsCount$ = this.cartService.cartItems$;

  constructor(private cartService: CartService) {}

  getTotalItems(): number {
    return this.cartService.getTotalItems();
  }
}
