import { Component, signal, ViewEncapsulation } from '@angular/core';
import { Icon } from '../../ui/components/icon/icon';

@Component({
  selector: 'gog-cart-dropdown',
  imports: [Icon],
  templateUrl: './cart-dropdown.component.html',
  styleUrl: './cart-dropdown.component.scss',
  encapsulation: ViewEncapsulation.Emulated,
})
export class CartDropdownComponent {
  protected readonly cartItemsCount = signal(2);
}
