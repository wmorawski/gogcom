import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent, ButtonVariant } from './button.component';
import { ComponentRef } from '@angular/core';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let componentRef: ComponentRef<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have variant input with default value primary', () => {
    expect(component.variant()).toBe('primary');
  });

  it('should accept variant input', () => {
    const variants: ButtonVariant[] = ['primary', 'secondary', 'outline', 'success'];
    variants.forEach((variant) => {
      componentRef.setInput('variant', variant);
      fixture.detectChanges();
      expect(component.variant()).toBe(variant);
    });
  });

  it('should have disabled input with default value false', () => {
    expect(component.disabled()).toBe(false);
  });

  it('should accept disabled input', () => {
    componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(component.disabled()).toBe(true);
  });

  it('should have disablePointerEvents input with default value false', () => {
    expect(component.disablePointerEvents()).toBe(false);
  });

  it('should accept disablePointerEvents input', () => {
    componentRef.setInput('disablePointerEvents', true);
    fixture.detectChanges();
    expect(component.disablePointerEvents()).toBe(true);
  });
});
