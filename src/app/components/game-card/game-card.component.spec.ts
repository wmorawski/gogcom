import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameCardComponent } from './game-card.component';
import { Game } from '../../types/games.types';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('GameCardComponent', () => {
  let component: GameCardComponent;
  let fixture: ComponentFixture<GameCardComponent>;
  let compiled: DebugElement;

  const mockGame: Game = {
    id: 1,
    title: 'Test Game',
    coverUrl: 'test.jpg',
    price: 9.99,
    discount: 50,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GameCardComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display game title', () => {
    fixture.componentRef.setInput('game', mockGame);
    fixture.detectChanges();

    const title = compiled.query(By.css('.game-title'));
    expect(title?.nativeElement.textContent).toContain('Test Game');
  });

  it('should display game price', () => {
    fixture.componentRef.setInput('game', mockGame);
    fixture.detectChanges();

    const price = compiled.query(By.css('.game-price'));
    expect(price?.nativeElement.textContent).toContain('9.99');
  });

  it('should show discount badge when discount exists', () => {
    fixture.componentRef.setInput('game', mockGame);
    fixture.detectChanges();

    const badge = compiled.query(By.css('gog-badge'));
    expect(badge).toBeTruthy();
  });

  it('should not show discount badge when no discount', () => {
    const gameWithoutDiscount = { ...mockGame, discount: undefined };
    fixture.componentRef.setInput('game', gameWithoutDiscount);
    fixture.detectChanges();

    const badge = compiled.query(By.css('gog-badge'));
    expect(badge).toBeFalsy();
  });

  it('should emit addToCart event when button clicked', () => {
    fixture.componentRef.setInput('game', mockGame);
    fixture.componentRef.setInput('isInCart', false);

    spyOn(component.addToCart, 'emit');
    fixture.detectChanges();

    const button = compiled.query(By.css('button'));
    button?.nativeElement.click();

    expect(component.addToCart.emit).toHaveBeenCalled();
  });

  it('should show "IN CART" when isInCart is true', () => {
    fixture.componentRef.setInput('game', mockGame);
    fixture.componentRef.setInput('isInCart', true);
    fixture.detectChanges();

    const button = compiled.query(By.css('button'));
    expect(button?.nativeElement.textContent).toContain('IN CART');
  });
});
