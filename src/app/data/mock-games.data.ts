import { Game } from 'types/games.types';

export const MOCK_GAMES: Game[] = [
  {
    id: 1,
    title: 'The Witcher Adventure Game',
    coverUrl: 'images/witcher.png',
    price: 9.99,
    gameOfTheWeek: true,
  },
  {
    id: 2,
    title: "Oddworld: Stranger's Wrath",
    coverUrl: 'images/oddworld.jpg',
    price: 9.99,
    discount: 50,
  },
  {
    id: 3,
    title: 'Chaos on Deponia',
    coverUrl: 'images/deponia.jpg',
    price: 14.99,
    owned: true,
  },
  {
    id: 4,
    title: 'The settlers 2: gold edition',
    coverUrl: 'images/settlers.jpg',
    price: 5.99,
  },
  {
    id: 5,
    title: 'neverwinter nights',
    coverUrl: 'images/neverwinter.jpg',
    price: 9.99,
    discount: 50,
  },
  {
    id: 6,
    title: 'assassin’s creed: director’s cut',
    coverUrl: 'images/assassin.jpg',
    price: 9.99,
  },
];
