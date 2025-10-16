import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { CartDropdownComponent } from '../cart-dropdown/cart-dropdown.component';

@Component({
  selector: 'gog-header',
  imports: [NgOptimizedImage, CartDropdownComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
