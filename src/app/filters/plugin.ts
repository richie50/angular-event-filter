import { Injectable, Inject } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { FilteredEventService } from './singleton';
import { FILTERED, PREVENT, STOP, SUPPORTED, GLOBAL_NOT_SUPPORTED } from './const';
// this is not public API so we cannot extend it
// import {EventManagerPlugin} from '@angular/platform-browser/src/dom/events/event_manager';



// TODO: A subject to change: https://github.com/angular/angular/issues/3929
@Injectable()
export class FilteredEventPlugin { // extends EventManagerPlugin {
    manager: EventManager;

    constructor(@Inject(FilteredEventService) private readonly filteredEventService: FilteredEventService) {}

    supports(eventName: string): boolean {
        const eventArray = eventName.split('.');

        return eventArray.indexOf(FILTERED) !== -1 ||
               eventArray.indexOf(PREVENT) !== -1 ||
               eventArray.indexOf(STOP) !== -1;
    }

    addEventListener(element: HTMLElement, eventName: string, handler: Function): Function {
        const {manager} = this;
        const eventArray = eventName.split('.');
        const actualEventName = eventArray
            .filter(modifier => SUPPORTED.indexOf(modifier) === -1)
            .join('.');
        const zone = manager.getZone();
        const filtered = (event: Event) => {
            const filter = this.filteredEventService.getFilter(element, actualEventName);

            if (eventArray.indexOf(FILTERED) === -1 || !filter || filter(event)) {
                if (eventArray.indexOf(PREVENT) !== -1) {
                    event.preventDefault();
                }

                if (eventArray.indexOf(STOP) !== -1) {
                    event.stopPropagation();
                }

                zone.run(() => handler(event));
            }
        };
        const wrapper = () => manager.addEventListener(element, actualEventName, filtered);

        return zone.runOutsideAngular(wrapper);
    }

    addGlobalEventListener(element: string, eventName: string, handler: Function): Function {
        console.warn(GLOBAL_NOT_SUPPORTED);        
        const actualEventName = eventName
            .split('.')
            .filter(modifier => SUPPORTED.indexOf(modifier) === -1)
            .join('.');

        return this.manager.addGlobalEventListener(element, actualEventName, handler);
    }
}
