import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartDropdownComponent } from './cart-dropdown.component';
import { Game } from '../../types/games.types';
import { ComponentRef } from '@angular/core';

describe('CartDropdownComponent', () => {
  let component: CartDropdownComponent;
  let fixture: ComponentFixture<CartDropdownComponent>;
  let componentRef: ComponentRef<CartDropdownComponent>;

  const mockItems: Game[] = [
    {
      id: 1,
      title: 'Game 1',
      coverUrl: 'game1.jpg',
      price: 29.99,
    },
    {
      id: 2,
      title: 'Game 2',
      coverUrl: 'game2.jpg',
      price: 49.99,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartDropdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CartDropdownComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have items input with default empty array', () => {
    expect(component.items()).toEqual([]);
  });

  it('should have totalPrice input with default 0', () => {
    expect(component.totalPrice()).toBe(0);
  });

  it('should accept items input', () => {
    componentRef.setInput('items', mockItems);
    fixture.detectChanges();
    expect(component.items()).toEqual(mockItems);
  });

  it('should accept totalPrice input', () => {
    componentRef.setInput('totalPrice', 79.98);
    fixture.detectChanges();
    expect(component.totalPrice()).toBe(79.98);
  });

  it('should compute itemsCount correctly', () => {
    expect(component['itemsCount']()).toBe(0);

    componentRef.setInput('items', mockItems);
    fixture.detectChanges();
    expect(component['itemsCount']()).toBe(2);
  });

  it('should compute itemsCount correctly for empty cart', () => {
    componentRef.setInput('items', []);
    fixture.detectChanges();
    expect(component['itemsCount']()).toBe(0);
  });

  it('should compute itemsCount correctly for single item', () => {
    componentRef.setInput('items', [mockItems[0]]);
    fixture.detectChanges();
    expect(component['itemsCount']()).toBe(1);
  });
});
