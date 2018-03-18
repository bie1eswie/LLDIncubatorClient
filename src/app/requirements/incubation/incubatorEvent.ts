import { EventType } from './eventType';
import { EventInvitation } from './eventInvitation';
export class IncubatorEvent {
  public Description: string;
  public ShortDescription: string;
  public StartDateText: string;
  public EntDateText: string;
  public EventType: EventType;
  public Invitations: EventInvitation[];
}
