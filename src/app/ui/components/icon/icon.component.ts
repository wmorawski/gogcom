import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { AllIcons, IconColor, IconName, IconOpacity, IconSize } from './icon.types';

const opacities: IconOpacity = {
  [AllIcons.Cart]: '0.851',
};

@Component({
  selector: 'gog-icon',
  imports: [],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  host: {
    '[style.width]': `size() + 'px'`,
    '[style.height]': `size() + 'px'`,
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  public readonly name = input.required<IconName>();
  public readonly size = input<IconSize>(IconSize.Small);
  public readonly color = input<`${IconColor}`>(IconColor.Primary);

  protected readonly iconPath = computed(() => `icons/icons.svg#${this.name()}`);
  protected readonly iconOpacity = computed(() => opacities[this.name()] || 1);
}
