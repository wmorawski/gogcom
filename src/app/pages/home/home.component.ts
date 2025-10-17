import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GamesStore } from '@stores/games.store';
import { CartStore } from '@stores/cart.store';
import { Game } from 'types/games.types';
import { FeaturedGameComponent } from '@components/featured-game/featured-game.component';
import { GameCardComponent } from '@components/game-card/game-card.component';

@Component({
  selector: 'gog-home',
  imports: [FeaturedGameComponent, GameCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  protected readonly gamesStore = inject(GamesStore);
  protected readonly cartStore = inject(CartStore);

  protected addToCart(game: Game) {
    this.cartStore.add(game);
  }
}
