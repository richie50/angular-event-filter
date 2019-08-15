import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PopupComponent } from './demo/popup/popup';
import { SelectComponent } from './demo/select/select';

import { FilteredEventPlugin } from './filters/plugin';
import { FilteredEventService } from './filters/singleton';
import { EventFiltersDirective } from './filters/directive';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [
    AppComponent,
    EventFiltersDirective,
    PopupComponent,
    SelectComponent,
  ],
  providers:    [
                  FilteredEventService,
                  {
                    provide: EVENT_MANAGER_PLUGINS,
                    useClass: FilteredEventPlugin,
                    multi: true,
                  }
                ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
