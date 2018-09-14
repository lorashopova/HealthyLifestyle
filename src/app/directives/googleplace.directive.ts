import { Directive, ElementRef, EventEmitter, Output, HostListener } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MapsAPILoader } from "@agm/core";

declare var google: any;

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[googleplace]',
    providers: [NgModel],
})
export class GoogleplaceDirective {
    @Output() setAddress: EventEmitter<any> = new EventEmitter();
    modelValue: any;
    autocomplete: any;
    private _el: HTMLElement;

    constructor(el: ElementRef, private model: NgModel, private mapsAPILoader: MapsAPILoader) {
        this._el = el.nativeElement;
        this.modelValue = this.model;
        const input = this._el;
        this.mapsAPILoader.load().then(() => {
            this.autocomplete = new google.maps.places.Autocomplete(input, {});
            google.maps.event.addListener(this.autocomplete, 'place_changed', () => {
                const place = this.autocomplete.getPlace();
                this.invokeEvent(place);
            });
        });
    };

    invokeEvent(place: Object) {
        this.setAddress.emit(place);
    }

    @HostListener('oninputchange') onInputChange() {

    }
}
