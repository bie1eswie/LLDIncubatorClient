import { FieldSet } from './fieldSet';
import { BaseComponent } from './BaseComponent';

export class FieldSetGroup extends BaseComponent
{
    public fieldSets: FieldSet[];
    public active: boolean;
    public name: string;
}
