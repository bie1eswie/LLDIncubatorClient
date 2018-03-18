import { FieldSetGroup } from './fieldSetGroup';
import { BaseComponent } from './BaseComponent';
export class RequirementsTab  extends BaseComponent
{
    public fieldSetGroups: FieldSetGroup[];
    public index: number;
    public name: string;
    public active: boolean;
}
