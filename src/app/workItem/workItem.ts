import {Client} from './client';
import {WorkItemStatusInfor} from './workItemStatusInfor';
import { WorkItemTimeLine } from '../requirements/incubation/workItemTimeLine';
import { WorkItemIncubatorComments } from '../requirements/incubation/workItemIncubatorComments';
import { Registration } from '../views/account/registration';
import { WorkItemDocument } from '../requirements/workIremDocument';
import { ClientProfile } from './clientProfile';

export class WorkItem {
        public  workItemID: number;
        public  workItemReference: string;
        public  workItemStatusInfor: WorkItemStatusInfor;
        public  primaryClient: Client;
        public  createdDate: Date;
        public  modifiedDate: Date;
        public  currentRole: number;
        public  currentUser: number;
        public  workItemTimeLine: WorkItemTimeLine[];
        public  workItemIncubationComment: WorkItemIncubatorComments[];
        public  createdBy: Registration;
        public  workItemDocuments: WorkItemDocument;
        public  clientProfile: ClientProfile;
        public  isChecked: boolean;

        constructor(_client: Client,_status: WorkItemStatusInfor,_workItemID: number, role: number, user: number){
            this.primaryClient = _client;
            this.workItemStatusInfor = _status;
            this.workItemID = _workItemID;
            this.currentRole = role;
            this.currentUser = user;
            this.clientProfile = new ClientProfile();
        }
}
