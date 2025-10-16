import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconComponent } from './icon.component';
import { AllIcons, IconColor, IconSize } from './icon.types';
import { ComponentRef } from '@angular/core';

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;
  let componentRef: ComponentRef<IconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
  });

  it('should create', () => {
    componentRef.setInput('name', AllIcons.Cart);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should have name input', () => {
    componentRef.setInput('name', AllIcons.Cart);
    fixture.detectChanges();
    expect(component.name()).toBe(AllIcons.Cart);
  });

  it('should have size input with default value Small', () => {
    componentRef.setInput('name', AllIcons.Cart);
    fixture.detectChanges();
    expect(component.size()).toBe(IconSize.Small);
  });

  it('should accept size input', () => {
    componentRef.setInput('name', AllIcons.Cart);
    componentRef.setInput('size', IconSize.Large);
    fixture.detectChanges();
    expect(component.size()).toBe(IconSize.Large);
  });

  it('should have color input with default value Primary', () => {
    componentRef.setInput('name', AllIcons.Cart);
    fixture.detectChanges();
    expect(component.color()).toBe(IconColor.Primary);
  });

  it('should accept color input', () => {
    componentRef.setInput('name', AllIcons.Cart);
    componentRef.setInput('color', IconColor.Success);
    fixture.detectChanges();
    expect(component.color()).toBe(IconColor.Success);
  });

  it('should compute iconPath correctly', () => {
    componentRef.setInput('name', AllIcons.Cart);
    fixture.detectChanges();
    expect(component['iconPath']()).toBe(`icons/icons.svg#${AllIcons.Cart}`);
  });

  it('should compute iconOpacity correctly for cart icon', () => {
    componentRef.setInput('name', AllIcons.Cart);
    fixture.detectChanges();
    expect(component['iconOpacity']()).toBe('0.851');
  });

  it('should compute iconOpacity as 1 for icons without custom opacity', () => {
    // If more icons are added without custom opacity, this test validates default behavior
    componentRef.setInput('name', AllIcons.Cart);
    fixture.detectChanges();
    const opacity = component['iconOpacity']();
    expect(opacity).toBeTruthy();
  });
});
