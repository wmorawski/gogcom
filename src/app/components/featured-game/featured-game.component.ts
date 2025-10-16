import { Component, input } from '@angular/core';
import { Game } from '../../types/games.types';

@Component({
  selector: 'gog-featured-game',
  imports: [],
  templateUrl: './featured-game.component.html',
  styleUrl: './featured-game.component.scss',
})
export class FeaturedGameComponent {
  public readonly game = input.required<Game>();
}
