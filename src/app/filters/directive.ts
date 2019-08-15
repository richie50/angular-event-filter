import { Directive, ElementRef, Inject, Input, OnDestroy, Optional, Self } from '@angular/core';
import { EventFiltersService } from './service';
import { FilteredEventService } from './singleton';
import { Filters } from './model';

const ALREADY_APPLIED = `
    Component you are trying to use eventFilters on already has filters applied inside,
    to avoid conflicts you cannot use directive directly on this component's host. You
    need to wrap it in another HTML element and apply directive on the wrapper.
`;

@Directive({
    selector: '[eventFilters]',
})
export class EventFiltersDirective implements OnDestroy {
    @Input()
    set eventFilters(filters: Filters) {
        if (!!this.eventFiltersService) {
            console.warn(ALREADY_APPLIED);

            return;
        }

        this.filteredEventService.register(this.elementRef.nativeElement, filters);
    }

    constructor(
        @Inject(ElementRef) private readonly elementRef: ElementRef,
        @Inject(FilteredEventService) private readonly filteredEventService: FilteredEventService,
        @Optional()
        @Self()
        @Inject(EventFiltersService)
        private readonly eventFiltersService: EventFiltersService | null,
    ) {}

    ngOnDestroy() {
        this.filteredEventService.unregister(this.elementRef.nativeElement);
    }
}
