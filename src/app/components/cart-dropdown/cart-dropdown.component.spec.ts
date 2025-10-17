import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartDropdownComponent } from './cart-dropdown.component';
import { Game } from 'types/games.types';
import { By } from '@angular/platform-browser';
import { OverlayContainer, OverlayModule } from '@angular/cdk/overlay';

function makeGame(id: number, price = 10): Game {
  return { id, title: `Game ${id}`, coverUrl: 'img.png', price };
}

describe('CartDropdownComponent', () => {
  let fixture: ComponentFixture<CartDropdownComponent>;
  let component: CartDropdownComponent;
  let overlayContainer: OverlayContainer;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverlayModule, CartDropdownComponent],
    }).compileComponents();

    overlayContainer = TestBed.inject(OverlayContainer);

    fixture = TestBed.createComponent(CartDropdownComponent);
    component = fixture.componentInstance;
  });

  function openDropdown() {
    const btn = fixture.debugElement.query(By.css('button'));
    btn.triggerEventHandler('click');
    fixture.detectChanges();
  }

  function overlayEl(): HTMLElement {
    return overlayContainer.getContainerElement();
  }

  it('should show empty state when there are no items', () => {
    fixture.componentRef.setInput('items', []);
    fixture.componentRef.setInput('totalPrice', 0);
    fixture.detectChanges();

    openDropdown();

    const empty = overlayEl().querySelector('.empty') as HTMLElement;
    expect(empty).toBeTruthy();
    expect(empty.textContent).toContain('Your cart is empty');
  });

  it('should render header with item count and total price when items exist', () => {
    const items = [makeGame(1, 9.99), makeGame(2, 5)];
    fixture.componentRef.setInput('items', items);
    fixture.componentRef.setInput('totalPrice', 14.99);
    fixture.detectChanges();

    openDropdown();

    const headerInfo = overlayEl().querySelector('.cart-content-header-info') as HTMLElement;
    expect(headerInfo).toBeTruthy();
    expect(headerInfo.textContent).toContain('2 items in cart');
    expect(headerInfo.textContent).toContain('14.99');
  });

  it('should emit clearCart when Clear cart button clicked', () => {
    const items = [makeGame(1)];
    fixture.componentRef.setInput('items', items);
    fixture.componentRef.setInput('totalPrice', 10);

    const spy = jasmine.createSpy('clear');
    component.clearCart.subscribe(spy);

    fixture.detectChanges();
    openDropdown();

    const clearBtn = overlayEl().querySelector('gog-button') as HTMLElement;
    clearBtn.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('should emit removeItem from child remove click', () => {
    const items = [makeGame(1)];
    fixture.componentRef.setInput('items', items);
    fixture.componentRef.setInput('totalPrice', 10);

    const spy = jasmine.createSpy('remove');
    component.removeItem.subscribe(spy);

    fixture.detectChanges();
    openDropdown();

    const childRemoveBtn = overlayEl().querySelector('gog-cart-dropdown-item gog-button');
    (childRemoveBtn as HTMLElement).dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(items[0]);
  });

  it('trigger shows items count and pressed class when open', () => {
    const items = [makeGame(1), makeGame(2)];
    fixture.componentRef.setInput('items', items);
    fixture.componentRef.setInput('totalPrice', 20);
    fixture.detectChanges();

    const trigger = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
    expect(trigger.textContent).toContain('2');
    expect(trigger.classList.contains('pressed')).toBeFalse();

    openDropdown();

    expect(trigger.classList.contains('pressed')).toBeTrue();
  });
});
