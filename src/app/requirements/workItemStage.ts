import { BaseComponent } from './BaseComponent';
import { StarterViewComponent } from '../views/appviews/starterview.component';
import { RejectionReason } from '../utilities/RejectionReason';

export class WorkItemStage extends BaseComponent {
      public stage: string;
      public isActive: boolean;
      public stageCode: string;
      public rejectionReasonViews: RejectionReason[]
      public nextStage: string;
      public previousStage: string;
      constructor() {
        super();
        this.rejectionReasonViews = [];
      }
}
