import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { IconComponent } from '@ui/components/icon/icon.component';
import { Game } from 'types/games.types';
import { DropdownTriggerForDirective } from '@directives/dropdown-trigger-for.directive';
import { DropdownComponent } from '@ui/components/dropdown/dropdown.component';
import { IconSize } from '@ui/components/icon/icon.types';
import { ButtonComponent } from '@ui/components/button/button.component';
import { CurrencyPipe, I18nPluralPipe } from '@angular/common';
import { CartDropdownItemComponent } from './cart-dropdown-item/cart-dropdown-item.component';

@Component({
  selector: 'gog-cart-dropdown',
  imports: [
    IconComponent,
    DropdownTriggerForDirective,
    DropdownComponent,
    ButtonComponent,
    I18nPluralPipe,
    CurrencyPipe,
    CartDropdownItemComponent,
  ],
  templateUrl: './cart-dropdown.component.html',
  styleUrl: './cart-dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartDropdownComponent {
  public readonly items = input<Game[]>([]);
  public readonly totalPrice = input<number>(0);

  public readonly clearCart = output();
  public readonly removeItem = output<Game>();

  protected readonly itemsCount = computed(() => this.items().length);
  protected readonly IconSize = IconSize;

  protected readonly itemsCountMapping = {
    '=0': '0 items in cart',
    '=1': '1 item in cart',
    other: '# items in cart',
  };
}
