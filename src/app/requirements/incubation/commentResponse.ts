import { Registration } from '../../views/account/registration';
import { User } from '../../views/account/user';
export class CommentResponse {
  public user: string;
  public response: string;
  public date: string;
  public commentID: number;
  public createdByUser: Registration;
  public createdBy: number;
  public isDirty: boolean;
  public isNew: boolean;
}
