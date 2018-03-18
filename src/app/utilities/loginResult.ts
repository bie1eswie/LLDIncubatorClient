
import {OperationResult} from './operationResult';
import { WorkItem } from '../workItem/workItem';
import { WorkItemDocument } from '../requirements/workIremDocument';

export class LoginResult extends OperationResult {
    public workItem: WorkItem;
}
