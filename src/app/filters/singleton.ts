import { Injectable } from '@angular/core';
import { Filters, Filter } from './model';

@Injectable()
export class FilteredEventService {
    private elements: Map<Element, Filters> = new Map();

    register(element: Element, filters: Filters) {
        this.elements.set(element, filters);
    }

    unregister(element: Element) {
        this.elements.delete(element);
    }

    getFilter(element: Element, event: string): Filter | null {
        const map = this.elements.get(element);

        return map ? map[event] || null : null;
    }
}
