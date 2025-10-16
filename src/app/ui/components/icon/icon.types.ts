export enum AllIcons {
  Cart = 'cart',
}

export type IconName = `${AllIcons}`;

export enum IconSize {
  SmallX = 12,
  Small = 16,
  Medium = 24,
  Large = 32,
  LargeX = 48,
  LargeXX = 64,
}

export enum IconColor {
  Primary = 'primary',
  Gog = 'gog',
  Header = 'header',
  Secondary = 'secondary',
  Success = 'success',
  Warning = 'warning',
  Danger = 'danger',
  Info = 'info',
  Light = 'light',
  Dark = 'dark',
}

export type IconOpacity = Partial<Record<AllIcons, string>>;
