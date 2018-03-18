import { WorkItem } from 'app/workItem/workItem';
export class StageUpdateView
    {
         reason: string;
         comment: string;
         toStage: string;
         workItem: WorkItem;
         currentUser: number;
         isReject: boolean;
         fromStage: string;
    }
