import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeaturedGameComponent } from './featured-game.component';
import { Game } from 'types/games.types';
import { ComponentRef } from '@angular/core';

describe('FeaturedGameComponent', () => {
  let component: FeaturedGameComponent;
  let fixture: ComponentFixture<FeaturedGameComponent>;
  let componentRef: ComponentRef<FeaturedGameComponent>;

  const mockGame: Game = {
    id: 1,
    title: 'Featured Game',
    coverUrl: 'featured.jpg',
    price: 49.99,
    gameOfTheWeek: true,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedGameComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedGameComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('game', mockGame);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have game input', () => {
    expect(component.game()).toEqual(mockGame);
  });

  it('should call confetti when reveal is called', () => {
    spyOn(component, 'reveal');
    component.reveal();
    expect(component.reveal).toHaveBeenCalled();
  });
});
