import { Component, ElementRef, Input } from '@angular/core';
import { FieldSetGroup } from '../../requirements/fieldSetGroup';

@Component({
    selector: 'app-fieldsetgroup',
    templateUrl: `./fieldSetGroup.component.html`
})

export class FieldSetGroupComponent {
    @Input()
    public fieldSetGroup: FieldSetGroup;
    public elementRef;
}
