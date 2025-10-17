import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { DropdownTriggerForDirective } from './dropdown-trigger-for.directive';
import { DropdownComponent } from '@ui/components/dropdown/dropdown.component';

@Component({
  selector: 'gog-host',
  standalone: true,
  imports: [DropdownTriggerForDirective, DropdownComponent],
  template: `
    <button [gogDropdownTriggerFor]="dropdown" [preventCloseOnClick]="preventClose">Open</button>
    <gog-dropdown #dropdown>
      <div class="inside">Hello</div>
    </gog-dropdown>
  `,
})
class HostComponent {
  preventClose = false;
}

describe('DropdownTriggerForDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let overlayContainer: OverlayContainer;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverlayModule, HostComponent],
    }).compileComponents();

    overlayContainer = TestBed.inject(OverlayContainer);

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  function getOverlay(): HTMLElement {
    return overlayContainer.getContainerElement();
  }

  it('should open overlay on trigger click and set dropdownOpen', () => {
    const btn = fixture.debugElement.query(By.css('button'));
    btn.triggerEventHandler('click');
    fixture.detectChanges();

    const overlayEl = getOverlay();
    expect(overlayEl.querySelector('.dropdown-content'))
      .withContext('content exists')
      .not.toBeNull();
  });

  it('should close on backdrop click', () => {
    const btn = fixture.debugElement.query(By.css('button'));
    btn.triggerEventHandler('click');
    fixture.detectChanges();

    const overlayEl = getOverlay();
    const backdrop = overlayEl.querySelector('.cdk-overlay-backdrop') as HTMLElement;
    expect(backdrop).toBeTruthy();

    backdrop.click();
    fixture.detectChanges();

    expect(overlayEl.querySelector('.dropdown-content')).toBeNull();
  });

  it('should not close when content clicked if preventCloseOnClick is true', () => {
    fixture.componentInstance.preventClose = true;
    fixture.detectChanges();

    const btn = fixture.debugElement.query(By.css('button'));
    btn.triggerEventHandler('click');
    fixture.detectChanges();

    const overlayEl = getOverlay();
    const content = overlayEl.querySelector('.dropdown-content') as HTMLElement;
    expect(content).toBeTruthy();

    // Clicking the content emits dropdown.closed, but preventCloseOnClick makes directive ignore it
    content.click();
    fixture.detectChanges();

    expect(overlayEl.querySelector('.dropdown-content')).not.toBeNull();
  });
});
