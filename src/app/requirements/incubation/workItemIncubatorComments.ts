import { CommentResponse } from './commentResponse';
import { Registration } from '../../views/account/registration';
export class WorkItemIncubatorComments {
        public commentID: number;
        public commentText: string;
        public workItemID: number;
        public createdDateTime: string;
        public shortDescription: string;
        public isDirty: boolean;
        public isNew: boolean;
        public commentResponses: CommentResponse[];
        public placeHolder: CommentResponse;
        public createdByUser: Registration;
        constructor() {
          this.placeHolder = new  CommentResponse();
          this.commentResponses = [];
        }

}
