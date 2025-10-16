import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { Game } from '../types/games.types';
import { withStorageSync } from '@angular-architects/ngrx-toolkit';

const LS_KEY = 'gog-user-cart';

export type CartState = {
  entries: Game[];
};

const initialState: CartState = {
  entries: [],
};

function addOne(entries: Game[], gameToAdd: Game): Game[] {
  return [...entries, gameToAdd];
}

function removeOne(entries: Game[], gameId: number): Game[] {
  return entries.filter((e) => e.id !== gameId);
}

export const CartStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withStorageSync(LS_KEY),
  withComputed((store) => ({
    totalPrice: computed(() => store.entries().reduce((acc, curr) => acc + curr.price, 0)),
    entryIds: computed(() => new Set(store.entries().map((game) => game.id))),
  })),
  withMethods((store) => ({
    add(game: Game) {
      if (!store.entryIds().has(game.id)) {
        const next = addOne(store.entries(), game);
        patchState(store, { entries: next });
      }
    },
    remove(gameId: number) {
      const next = removeOne(store.entries(), gameId);
      patchState(store, { entries: next });
    },
    clear() {
      patchState(store, { entries: [] });
    },
    isInCart(gameId: number): boolean {
      return store.entryIds().has(gameId);
    },
  })),
);
