import { TestBed } from '@angular/core/testing';
import { GamesStore } from './games.store';
import { GamesService } from '@services/games.service';
import { of } from 'rxjs';
import { Game } from 'types/games.types';

describe('GamesStore', () => {
  let store: InstanceType<typeof GamesStore>;
  let gamesService: jasmine.SpyObj<GamesService>;

  const mockGames: Game[] = [
    {
      id: 1,
      title: 'Game 1',
      coverUrl: 'game1.jpg',
      price: 29.99,
      gameOfTheWeek: false,
    },
    {
      id: 2,
      title: 'Featured Game',
      coverUrl: 'featured.jpg',
      price: 49.99,
      gameOfTheWeek: true,
    },
    {
      id: 3,
      title: 'Game 3',
      coverUrl: 'game3.jpg',
      price: 19.99,
      gameOfTheWeek: false,
    },
  ];

  beforeEach(() => {
    const gamesServiceSpy = jasmine.createSpyObj('GamesService', ['getGames']);

    TestBed.configureTestingModule({
      providers: [{ provide: GamesService, useValue: gamesServiceSpy }],
    });

    gamesService = TestBed.inject(GamesService) as jasmine.SpyObj<GamesService>;
    gamesService.getGames.and.returnValue(of(mockGames));

    store = TestBed.inject(GamesStore);
  });

  it('should create', () => {
    expect(store).toBeTruthy();
  });

  it('should load games on init', () => {
    expect(gamesService.getGames).toHaveBeenCalled();
    expect(store.games()).toEqual(mockGames);
  });

  describe('featured', () => {
    it('should return the featured game', () => {
      const featured = store.featured();
      expect(featured).toBeDefined();
      expect(featured?.gameOfTheWeek).toBe(true);
      expect(featured?.title).toBe('Featured Game');
    });

    it('should return undefined when no featured game exists', () => {
      gamesService.getGames.and.returnValue(
        of([
          {
            id: 1,
            title: 'Game 1',
            coverUrl: 'game1.jpg',
            price: 29.99,
            gameOfTheWeek: false,
          },
        ]),
      );
      store.loadGames();
      expect(store.featured()).toBeUndefined();
    });
  });

  describe('withoutFeatured', () => {
    it('should return all games except the featured one', () => {
      const nonFeatured = store.withoutFeatured();
      expect(nonFeatured.length).toBe(2);
      expect(nonFeatured.every((game) => !game.gameOfTheWeek)).toBe(true);
    });

    it('should return all games when no featured game exists', () => {
      const gamesWithoutFeatured: Game[] = [
        {
          id: 1,
          title: 'Game 1',
          coverUrl: 'game1.jpg',
          price: 29.99,
          gameOfTheWeek: false,
        },
        {
          id: 2,
          title: 'Game 2',
          coverUrl: 'game2.jpg',
          price: 39.99,
          gameOfTheWeek: false,
        },
      ];
      gamesService.getGames.and.returnValue(of(gamesWithoutFeatured));
      store.loadGames();
      expect(store.withoutFeatured().length).toBe(2);
    });

    it('should return empty array when only featured game exists', () => {
      gamesService.getGames.and.returnValue(
        of([
          {
            id: 1,
            title: 'Featured Game',
            coverUrl: 'featured.jpg',
            price: 49.99,
            gameOfTheWeek: true,
          },
        ]),
      );
      store.loadGames();
      expect(store.withoutFeatured().length).toBe(0);
    });
  });

  describe('loadGames', () => {
    it('should update games state', () => {
      const newGames: Game[] = [
        {
          id: 4,
          title: 'New Game',
          coverUrl: 'new.jpg',
          price: 59.99,
        },
      ];
      gamesService.getGames.and.returnValue(of(newGames));
      store.loadGames();
      expect(store.games()).toEqual(newGames);
    });
  });
});
