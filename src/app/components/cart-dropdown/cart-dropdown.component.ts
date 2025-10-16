import { Component, computed, input } from '@angular/core';
import { IconComponent } from '../../ui/components/icon/icon.component';
import { Game } from '../../types/games.types';

@Component({
  selector: 'gog-cart-dropdown',
  imports: [IconComponent],
  templateUrl: './cart-dropdown.component.html',
  styleUrl: './cart-dropdown.component.scss',
})
export class CartDropdownComponent {
  public readonly items = input<Game[]>([]);
  public readonly totalPrice = input<number>(0);

  protected readonly itemsCount = computed(() => this.items().length);
}
