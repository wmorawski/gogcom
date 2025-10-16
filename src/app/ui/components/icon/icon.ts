import { Component, computed, input } from '@angular/core';
import { AllIcons, IconColor, IconName, IconOpacity, IconSize } from './icon.types';

const opacities: IconOpacity = {
  [AllIcons.Cart]: '0.851',
};

@Component({
  selector: 'gog-icon',
  imports: [],
  templateUrl: './icon.html',
  styleUrl: './icon.scss',
  host: {
    '[style.width]': `size() + 'px'`,
    '[style.height]': `size() + 'px'`,
  },
})
export class Icon {
  public readonly name = input.required<IconName>();
  public readonly size = input<IconSize>(IconSize.Small);
  public readonly color = input<`${IconColor}`>(IconColor.Primary);

  protected readonly iconPath = computed(() => `icons/icons.svg#${this.name()}`);
  protected readonly iconOpacity = computed(() => opacities[this.name()] || 1);
}
