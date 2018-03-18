import { WorkItem } from "../workItem/workItem";

export class StatusGridViewPage{
  public workItems: WorkItem[];
  public status: string;
  public active: boolean;
  public pageNumber: number;
}
