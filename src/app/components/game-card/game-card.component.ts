import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Game } from 'types/games.types';
import { BadgeComponent } from '@ui/components/badge/badge.component';
import { DiscountPipe } from '@pipes/discount-pipe';
import { ButtonComponent } from '@ui/components/button/button.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'gog-game-card',
  imports: [BadgeComponent, DiscountPipe, ButtonComponent, CurrencyPipe],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameCardComponent {
  public readonly game = input.required<Game>();
  public readonly isInCart = input(false);

  public readonly addToCart = output();
}
