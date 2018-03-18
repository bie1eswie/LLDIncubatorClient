import { DropdownValue } from './dropDownValue';
import { WorkItemDocument } from './workIremDocument';
import { BaseComponent } from './BaseComponent';
import { StarterViewComponent } from '../views/appviews/starterview.component';
import { CalculationManager } from '../utilities/calculationManager';
import { CalculationParameter } from './calculationParameter';
import { FieldSetGroup } from './fieldSetGroup';
export class WorkItemField extends BaseComponent {
        public  fieldName: string;
        public  ID: number;
        public  FieldCode: string;
        public  WorkItemID: number;
        public  mapCode: string;
        public  fieldType: string;
        public  DropdownValues: DropdownValue[];
        public  WorkItemRef: string;
        public  fieldValue: string;
        public  FieldSetCode: string;
        public  workItemDocument: WorkItemDocument;
        public  DropDownValueCode: string;
        public  isDirty: boolean;
        public  isNew: boolean;
        public  OriginalFieldValue: string;
        public  isRequired: boolean;
        public  isValid: boolean;
        public  errorMessage: string;
        public  isEditable: boolean;
        public  hasDependends: boolean;
        public  calculationParameters: CalculationParameter[];
        public  calcculator: string;
        public  fieldSetGroup: FieldSetGroup;
        public  fieldScore: number;
        public  fieldValueLength: number;
}