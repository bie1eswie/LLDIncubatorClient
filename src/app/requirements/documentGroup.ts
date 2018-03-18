import { WorkItem } from '../workItem/workItem';
import { WorkItemField } from './field';
import { WorkItemDocumentStatusInfor } from './workItemDocumentStatusInfor';

export class DocumentGroup {
       public name: string;
       public documentFields: WorkItemField[];
       public workItemStatusInfor: WorkItemDocumentStatusInfor;
}
