import { Component, input } from '@angular/core';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'success'
  | 'underlined-ghost'
  | 'gog';

@Component({
  selector: 'gog-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  public readonly variant = input<ButtonVariant>('primary');
  public readonly disabled = input(false);
  public readonly disablePointerEvents = input(false);
}
