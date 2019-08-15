import { Component, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
  selector: 'popup',
  templateUrl: './popup.html',
  styleUrls: ['./popup.less'],
})
export class PopupComponent  {
  @Output()
  closed = new EventEmitter<void>();

  @HostListener('window:keydown.esc')
  onEsc() {
    this.closed.emit();
  }
}
