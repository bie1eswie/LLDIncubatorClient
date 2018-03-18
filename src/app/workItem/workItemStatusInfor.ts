
export class WorkItemStatusInfor
{
   public statusID: number;
   public statusCode: string;
   public status: string;

    constructor(_statusID: number,_status: string,_statusCode: string) {
            this.statusID = _statusID;
            this.status = _status;
            this.statusCode = _statusCode;
        }
}
