export enum AllIcons {
  Cart = 'cart',
}

export type IconName = `${AllIcons}`;

export enum IconSize {
  SmallX = 12,
  Small = 16,
  Medium = 24,
  Large = 32,
}

export enum IconColor {
  Primary = 'primary',
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
