import { Game } from '../types/games.types';

export const MOCK_GAMES: Game[] = [
  {
    id: 1,
    title: 'The Witcher Adventure Game',
    coverUrl: 'assets/images/witcher.jpg',
    price: 999,
    gameOfTheWeek: true,
  },
  {
    id: 2,
    title: "Oddworld: Stranger's Wrath",
    coverUrl: 'assets/images/oddworld.jpg',
    price: 999,
    discount: 50,
  },
  {
    id: 3,
    title: 'Chaos on Deponia',
    coverUrl: 'assets/images/deponia.jpg',
    price: 1499,
    owned: true,
  },
  {
    id: 4,
    title: 'The settlers 2: gold edition',
    coverUrl: 'assets/images/settlers.jpg',
    price: 599,
  },
  {
    id: 5,
    title: 'neverwinter nights',
    coverUrl: 'assets/images/neverwinter.jpg',
    price: 999,
    discount: 50,
  },
  {
    id: 6,
    title: 'assassin’s creed: director’s cut',
    coverUrl: 'assets/images/assassin.jpg',
    price: 999,
  },
];
