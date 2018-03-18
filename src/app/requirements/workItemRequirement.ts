import { RequirementsTab } from './requirementTab';
import { StarterViewComponent } from '../views/appviews/starterview.component';
import { WorkItemStage } from './workItemStage';
import { DocumentGroup } from './documentGroup';

export class WorkItemRequirements
{
    requirementsTabs: RequirementsTab[];
    public active: boolean;
    public name: string;
    public isValid: boolean;
    public workItemStages: WorkItemStage[];
    public documentsTab: DocumentGroup;
    public hasDocuments: boolean;
    public currentWorkItemStage: WorkItemStage;
}
