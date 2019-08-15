import { ElementRef, Inject, Injectable } from '@angular/core';
import { FilteredEventService } from './singleton';
import { Filters } from './model';

@Injectable()
export class EventFiltersService {
    constructor(
        @Inject(ElementRef) private readonly elementRef: ElementRef,
        @Inject(FilteredEventService) private readonly filteredEventService: FilteredEventService,
    ) {}

    ngOnDestroy() {
        this.filteredEventService.unregister(this.elementRef.nativeElement);
    }

    register(filters: Filters) {
        this.filteredEventService.register(this.elementRef.nativeElement, filters);
    }
}
