import { Client } from '../../../workItem/client';
import { WorkItem } from '../../../workItem/workItem';
import { FieldSetGroup } from '../../fieldSetGroup';
export class InterventionReport {
  public client: Client;
  public eventID: number;
  public workItem: WorkItem;
  public fieldSetGroups: FieldSetGroup[];
}
