import { TestBed } from '@angular/core/testing';
import { GamesService } from './games.service';
import { MOCK_GAMES } from '../data/mock-games.data';

describe('GamesService', () => {
  let service: GamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getGames', () => {
    it('should return an Observable of games', (done) => {
      service.getGames().subscribe((games) => {
        expect(games).toEqual(MOCK_GAMES);
        done();
      });
    });
  });
});
