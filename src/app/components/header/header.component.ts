import { Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { CartDropdownComponent } from '../cart-dropdown/cart-dropdown.component';
import { CartStore } from '../../stores/cart.store';

@Component({
  selector: 'gog-header',
  imports: [NgOptimizedImage, CartDropdownComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  protected readonly cartStore = inject(CartStore);
}
