export class Client{
        public  clientName: string;
        public  clientType: number;
        public  clientTypeString: string;
        public  registrationNo: string;
        public  clientCode: string;
        public  clientID: number;
    constructor(_clientType: number,_clientTypeString: string) {
        this.clientType = _clientType;
        this.clientTypeString = _clientTypeString;
    }
}
