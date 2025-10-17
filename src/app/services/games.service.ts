import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Game } from 'types/games.types';
import { MOCK_GAMES } from '@data/mock-games.data';

@Injectable({ providedIn: 'root' })
export class GamesService {
  getGames(): Observable<Game[]> {
    return of(MOCK_GAMES);
  }
}
