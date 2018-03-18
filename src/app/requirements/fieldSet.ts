import { WorkItemField } from './field';
import { BaseComponent } from './BaseComponent';
export class FieldSet extends BaseComponent {
  public workItemFields: WorkItemField[];
  public isCalculated: boolean;
  public isHidden: boolean;
}
