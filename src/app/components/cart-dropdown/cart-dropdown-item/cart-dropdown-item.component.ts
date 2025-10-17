import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Game } from '../../../types/games.types';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { ButtonComponent } from '../../../ui/components/button/button.component';

@Component({
  selector: 'gog-cart-dropdown-item',
  imports: [NgOptimizedImage, CurrencyPipe, ButtonComponent],
  templateUrl: './cart-dropdown-item.component.html',
  styleUrl: './cart-dropdown-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartDropdownItemComponent {
  public readonly item = input.required<Game>();

  public readonly remove = output();
}
