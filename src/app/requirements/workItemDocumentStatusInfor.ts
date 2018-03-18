
export class WorkItemDocumentStatusInfor
{
   public StatusID: number;
   public StatusCode: string;
   public Status: string;

    constructor(_statusID: number,_status: string,_statusCode: string) {
            this.StatusID = _statusID;
            this.Status = _status;
            this.StatusCode = _statusCode;
    }
}
