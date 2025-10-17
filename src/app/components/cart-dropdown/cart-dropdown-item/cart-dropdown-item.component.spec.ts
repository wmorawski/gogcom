import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartDropdownItemComponent } from './cart-dropdown-item.component';
import { Game } from 'types/games.types';
import { By } from '@angular/platform-browser';

describe('CartDropdownItemComponent', () => {
  let fixture: ComponentFixture<CartDropdownItemComponent>;
  let component: CartDropdownItemComponent;

  const game: Game = {
    id: 123,
    title: 'Test Game',
    coverUrl: 'images/test.png',
    price: 19.99,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartDropdownItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CartDropdownItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('item', game);
    fixture.detectChanges();
  });

  it('should render title, price and image alt', () => {
    const titleEl: HTMLElement = fixture.debugElement.query(By.css('.title')).nativeElement;
    expect(titleEl.textContent?.trim()).toBe('Test Game');

    const priceEl: HTMLElement = fixture.debugElement.query(By.css('.price')).nativeElement;
    // Default locale/currency should format to $19.99
    expect(priceEl.textContent?.trim()).toContain('19.99');

    const imgEl: HTMLImageElement = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(imgEl.getAttribute('alt')).toBe('Test Game');
  });

  it('should emit remove when remove button is clicked', () => {
    const spy = jasmine.createSpy('remove');
    component.remove.subscribe(spy);

    const btn = fixture.debugElement.query(By.css('gog-button'));
    btn.triggerEventHandler('click');

    expect(spy).toHaveBeenCalled();
  });
});
