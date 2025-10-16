import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { CartStore } from '../../stores/cart.store';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let cartStore: InstanceType<typeof CartStore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    cartStore = TestBed.inject(CartStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject CartStore', () => {
    expect(component['cartStore']).toBe(cartStore);
  });

  it('should have access to cart store entries', () => {
    expect(component['cartStore'].entries).toBeDefined();
  });

  it('should have access to cart store totalPrice', () => {
    expect(component['cartStore'].totalPrice).toBeDefined();
  });
});
