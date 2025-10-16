export type Game = {
  id: number;
  title: string;
  coverUrl: string;
  price: number;
  discount?: number;
  owned?: boolean;
  gameOfTheWeek?: boolean;
};
