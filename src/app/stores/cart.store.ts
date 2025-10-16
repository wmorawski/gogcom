import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { Game } from '../types/games.types';

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
  withComputed((store) => ({
    totalItems: computed(() => store.entries().length),
    totalPrice: computed(() => store.entries().reduce((acc, curr) => acc + curr.price, 0)),
  })),
  withMethods((store) => ({
    add(game: Game) {
      const next = addOne(store.entries(), game);
      patchState(store, { entries: next });
    },
    remove(gameId: number) {
      const next = removeOne(store.entries(), gameId);
      patchState(store, { entries: next });
    },
    clear() {
      patchState(store, { entries: [] });
    },
  })),
);
