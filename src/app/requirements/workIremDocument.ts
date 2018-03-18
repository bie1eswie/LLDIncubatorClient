import { DocumentStatus } from './documentStatus';

export class WorkItemDocument {
    public documentName: string;
    public documentURL: string;
    public documentApproved: boolean;
    public fieldMapCode: string;
    public documentType: string;
    public documentExtention: string;
    public docummentID: number;
    public documentStatus: DocumentStatus;
    public documentID: number;
    public code: string;
    public documentRef: string;
    //public documentContent: ByteString;
    public CreatedDate: Date;
}
