import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BadgeComponent, BadgeVariant } from './badge.component';
import { ComponentRef } from '@angular/core';

describe('BadgeComponent', () => {
  let component: BadgeComponent;
  let fixture: ComponentFixture<BadgeComponent>;
  let componentRef: ComponentRef<BadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have variant input with default value info', () => {
    expect(component.variant()).toBe('info');
  });

  it('should accept variant input', () => {
    const variants: BadgeVariant[] = ['success', 'info', 'warning'];
    variants.forEach((variant) => {
      componentRef.setInput('variant', variant);
      fixture.detectChanges();
      expect(component.variant()).toBe(variant);
    });
  });

  it('should apply variant class to host element', () => {
    const variants: BadgeVariant[] = ['success', 'info', 'warning'];
    variants.forEach((variant) => {
      componentRef.setInput('variant', variant);
      fixture.detectChanges();
      const hostElement = fixture.nativeElement;
      expect(hostElement.className).toContain(variant);
    });
  });
});
