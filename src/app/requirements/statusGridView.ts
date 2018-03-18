import { WorkItem } from '../workItem/workItem';
import { StatusGridViewPage } from './statusGridViewPage';
export class StatusGridView {
   public statusGridViewPages: StatusGridViewPage[];
   public currentPage: StatusGridViewPage;
   public workItems: WorkItem[];
   public status: string;
   public active: boolean;
   public pageCount: number;
   public currentPageIndex;
}
