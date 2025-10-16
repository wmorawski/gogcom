import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Game } from '../types/games.types';
import { GamesService } from '../services/games.service';
import { switchMap, tap } from 'rxjs';

export type GamesState = {
  games: Game[];
};

const initialState: GamesState = {
  games: [],
};

export const GamesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    featured: computed(() => store.games().find((g) => g.gameOfTheWeek)),
    withoutFeatured: computed(() => store.games().filter((game) => !game.gameOfTheWeek)),
  })),
  withMethods((store, gamesService = inject(GamesService)) => ({
    loadGames: rxMethod<void>((origin$) =>
      origin$.pipe(
        switchMap(() => gamesService.getGames().pipe(tap((games) => patchState(store, { games })))),
      ),
    ),
  })),
  withHooks({
    onInit(store) {
      store.loadGames();
    },
  }),
);
