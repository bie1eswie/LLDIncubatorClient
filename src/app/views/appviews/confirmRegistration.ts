import { Router } from '@angular/router';
import { User } from '../account/user';
import { OperationResult } from '../../utilities/operationResult';
import { MembershipService } from '../../services/membership.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmAccount } from '../account/confirmAccount';

@Component({
  selector: 'confirmregistration',
  templateUrl: 'confirmRegistration.html'
})

export class ConfirmRegistrationComponent implements OnInit {

  public confirmAccount: ConfirmAccount;
  public errorMessage: string;
  ngOnInit() {
    this.confirmAccount = new ConfirmAccount();
  }

    constructor(public membershipService: MembershipService,
    public router: Router) { }

  SendVerification()
  {
     const _authenticationResult: OperationResult = new OperationResult(false, '');
    if(this.confirmAccount) {

      this.membershipService.unlockUser(this.confirmAccount)
        .subscribe((res: any) => {
          _authenticationResult.succeeded = res.succeeded;
          _authenticationResult.message = res.message;
          debugger;
          if (_authenticationResult.succeeded) {
            this.router.navigate(['login']);
          } else {
              this.errorMessage = res.message;
          }
        });

    }
  }
}
