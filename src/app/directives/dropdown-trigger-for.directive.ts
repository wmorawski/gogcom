import {
  Directive,
  ElementRef,
  EventEmitter,
  inject,
  input,
  Signal,
  TemplateRef,
  ViewContainerRef,
  WritableSignal,
} from '@angular/core';
import { merge, Observable, Subscription } from 'rxjs';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

export interface DropdownPanel {
  templateRef: Signal<TemplateRef<any> | undefined>;
  dropdownOpen: WritableSignal<boolean>;
  readonly closed: EventEmitter<void>;
}

@Directive({
  selector: '[gogDropdownTriggerFor]',
  host: {
    '(click)': 'toggleDropdown()',
  },
})
export class DropdownTriggerForDirective {
  public isDropdownOpen = false;
  public readonly dropdownPanel = input<DropdownPanel>(undefined, {
    alias: 'gogDropdownTriggerFor',
  });
  private overlayRef?: OverlayRef;
  private overlay = inject(Overlay);
  private elementRef = inject(ElementRef<HTMLElement>);
  private viewContainerRef = inject(ViewContainerRef);
  private dropdownClosingActionsSub = Subscription.EMPTY;

  public toggleDropdown() {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.isDropdownOpen ? this.destroyDropdown() : this.openDropdown();
  }

  openDropdown(): void {
    this.isDropdownOpen = true;
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.close(),
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.elementRef)
        .withPositions([
          {
            originX: 'end',
            originY: 'bottom',
            overlayX: 'end',
            overlayY: 'top',
          },
        ]),
    });

    const templatePortal = new TemplatePortal(
      this.dropdownPanel()!.templateRef()!,
      this.viewContainerRef,
    );
    this.dropdownPanel()!.dropdownOpen.set(true);
    this.overlayRef.attach(templatePortal);

    this.dropdownClosingActionsSub = this.dropdownClosingActions().subscribe(() =>
      this.destroyDropdown(),
    );
  }

  private dropdownClosingActions(): Observable<MouseEvent | void> {
    const backdropClick$ = this.overlayRef!.backdropClick();
    const detachment$ = this.overlayRef!.detachments();
    const dropdownClosed = this.dropdownPanel()!.closed;

    return merge(backdropClick$, detachment$, dropdownClosed);
  }

  private destroyDropdown(): void {
    if (!this.overlayRef || !this.isDropdownOpen) {
      return;
    }

    this.dropdownClosingActionsSub.unsubscribe();
    this.isDropdownOpen = false;
    this.dropdownPanel()!.dropdownOpen.set(false);
    this.overlayRef.detach();
  }
}
