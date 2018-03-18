import { WorkItemRequirements } from '../workItemRequirement';
import { QuarterMilestone } from './quarterMilestone';
import { FieldSetGroup } from '../fieldSetGroup';

export class QuardrantQuarter {
      public name: string;
      public description: string;
      public quarterID: number;
      public fieldSetGroups: FieldSetGroup[];
      public active: boolean;
      public index: number;
      public quarterMilestones: QuarterMilestone[];
      public isDirty: boolean;
      public isNew: boolean;
      public quardrantID: number;
      public workItem: number;
}
