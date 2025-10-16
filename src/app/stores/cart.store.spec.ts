import { TestBed } from '@angular/core/testing';
import { CartStore } from './cart.store';
import { Game } from '../types/games.types';

describe('CartStore', () => {
  let store: InstanceType<typeof CartStore>;

  const mockGame1: Game = {
    id: 1,
    title: 'Test Game 1',
    coverUrl: 'test1.jpg',
    price: 29.99,
  };

  const mockGame2: Game = {
    id: 2,
    title: 'Test Game 2',
    coverUrl: 'test2.jpg',
    price: 49.99,
  };

  const ownedGame: Game = {
    id: 3,
    title: 'Owned Game',
    coverUrl: 'owned.jpg',
    price: 19.99,
    owned: true,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    store = TestBed.inject(CartStore);
    store.clear();
  });

  it('should create', () => {
    expect(store).toBeTruthy();
  });

  describe('initial state', () => {
    it('should have empty entries', () => {
      expect(store.entries()).toEqual([]);
    });

    it('should have totalPrice of 0', () => {
      expect(store.totalPrice()).toBe(0);
    });

    it('should have empty entryIds', () => {
      expect(store.entryIds().size).toBe(0);
    });
  });

  describe('add', () => {
    it('should add a game to cart', () => {
      store.add(mockGame1);
      expect(store.entries()).toContain(mockGame1);
      expect(store.entries().length).toBe(1);
    });

    it('should not add duplicate games', () => {
      store.add(mockGame1);
      store.add(mockGame1);
      expect(store.entries().length).toBe(1);
    });

    it('should not add owned games', () => {
      store.add(ownedGame);
      expect(store.entries().length).toBe(0);
    });

    it('should add multiple different games', () => {
      store.add(mockGame1);
      store.add(mockGame2);
      expect(store.entries().length).toBe(2);
      expect(store.entries()).toContain(mockGame1);
      expect(store.entries()).toContain(mockGame2);
    });
  });

  describe('remove', () => {
    it('should remove a game from cart by id', () => {
      store.add(mockGame1);
      store.add(mockGame2);
      store.remove(mockGame1.id);
      expect(store.entries().length).toBe(1);
      expect(store.entries()).not.toContain(mockGame1);
      expect(store.entries()).toContain(mockGame2);
    });

    it('should handle removing non-existent game', () => {
      store.add(mockGame1);
      store.remove(999);
      expect(store.entries().length).toBe(1);
      expect(store.entries()).toContain(mockGame1);
    });
  });

  describe('clear', () => {
    it('should remove all games from cart', () => {
      store.add(mockGame1);
      store.add(mockGame2);
      store.clear();
      expect(store.entries()).toEqual([]);
      expect(store.entries().length).toBe(0);
    });
  });

  describe('isInCart', () => {
    it('should return true for games in cart', () => {
      store.add(mockGame1);
      expect(store.isInCart(mockGame1.id)).toBe(true);
    });

    it('should return false for games not in cart', () => {
      expect(store.isInCart(mockGame1.id)).toBe(false);
    });

    it('should return false after removing game', () => {
      store.add(mockGame1);
      store.remove(mockGame1.id);
      expect(store.isInCart(mockGame1.id)).toBe(false);
    });
  });

  describe('totalPrice', () => {
    it('should calculate total price correctly', () => {
      store.add(mockGame1);
      store.add(mockGame2);
      expect(store.totalPrice()).toBe(79.98);
    });

    it('should update when games are removed', () => {
      store.add(mockGame1);
      store.add(mockGame2);
      store.remove(mockGame1.id);
      expect(store.totalPrice()).toBe(49.99);
    });

    it('should be 0 after clearing cart', () => {
      store.add(mockGame1);
      store.clear();
      expect(store.totalPrice()).toBe(0);
    });
  });

  describe('entryIds', () => {
    it('should return set of game ids in cart', () => {
      store.add(mockGame1);
      store.add(mockGame2);
      const ids = store.entryIds();
      expect(ids.has(mockGame1.id)).toBe(true);
      expect(ids.has(mockGame2.id)).toBe(true);
      expect(ids.size).toBe(2);
    });

    it('should update when games are added or removed', () => {
      store.add(mockGame1);
      expect(store.entryIds().size).toBe(1);
      store.add(mockGame2);
      expect(store.entryIds().size).toBe(2);
      store.remove(mockGame1.id);
      expect(store.entryIds().size).toBe(1);
      expect(store.entryIds().has(mockGame1.id)).toBe(false);
    });
  });
});
