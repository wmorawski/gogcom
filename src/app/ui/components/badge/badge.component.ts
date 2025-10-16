import { Component, input } from '@angular/core';

export type BadgeVariant = 'success' | 'info' | 'warning';

@Component({
  selector: 'gog-badge',
  imports: [],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
  host: {
    '[class]': 'variant()',
  },
})
export class BadgeComponent {
  public readonly variant = input<BadgeVariant>('info');
}
