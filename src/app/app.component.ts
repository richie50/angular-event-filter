import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
})
export class AppComponent  {
  items = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  popup = false;

  ngAfterViewChecked() {
    console.log('change detection cycle', Date.now());
  }

  onOpened() {
    this.popup = true;
  }

  onClosed() {
    this.popup = false;
  }
}
