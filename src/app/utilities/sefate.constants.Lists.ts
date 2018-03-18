import { RejectionReason } from './RejectionReason';

export class CommonLists{
  public RejectionReasons: RejectionReason[];
  public setReasons(rejectionReasons: RejectionReason[]) {
    this.RejectionReasons = rejectionReasons;
  }

  constructor(){

  }
}
