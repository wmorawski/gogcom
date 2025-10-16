import { Component, EventEmitter, Output, signal, TemplateRef, viewChild } from '@angular/core';
import { DropdownPanel } from '../../../directives/dropdown-trigger-for.directive';

@Component({
  selector: 'gog-dropdown',
  imports: [],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent implements DropdownPanel {
  @Output() public closed = new EventEmitter();
  public templateRef = viewChild(TemplateRef);
  public dropdownOpen = signal(false);
}
