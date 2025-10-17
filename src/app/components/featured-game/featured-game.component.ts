import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Game } from 'types/games.types';
import { ButtonComponent } from '@ui/components/button/button.component';
import { confetti } from '@tsparticles/confetti';

@Component({
  selector: 'gog-featured-game',
  imports: [ButtonComponent],
  templateUrl: './featured-game.component.html',
  styleUrl: './featured-game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedGameComponent {
  public readonly game = input.required<Game>();

  // A secret function that you should totally find
  public reveal() {
    confetti({
      spread: 360,
      ticks: 200,
      gravity: 0.66,
      decay: 0.94,
      startVelocity: 30,
      particleCount: 300,
      scalar: 2,
      shapes: ['image'],
      shapeOptions: {
        image: [
          {
            src: 'images/logo.png',
            width: 32,
            height: 32,
          },
        ],
      },
    }).then();
  }
}
