import {Directive, TemplateRef} from '@angular/core';
import {Tab} from './tab.directive';

@Directive({selector: '[tab-heading]'})
export class TabHeading {
    constructor(public templateRef:TemplateRef<any>, tab: Tab) {
        tab.headingRef = templateRef;
    }
}
