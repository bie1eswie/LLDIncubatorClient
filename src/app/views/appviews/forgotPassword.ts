import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../account/user';
import { OperationResult } from '../../utilities/operationResult';
import { MembershipService } from '../../services/membership.service';
import { ResetPassword } from '../account/resetPassword';

@Component({
  selector: 'forgotpassword',
  templateUrl: 'forgotPassword.html'
})

export class ForgotPasswordComponent implements OnInit {

  public resetPassword: ResetPassword;
  public errorMessage: String;
  ngOnInit() {
    this.resetPassword = new ResetPassword('', '','');
  }

  constructor(public membershipService: MembershipService,
    public router: Router) { }

  SendPassword() {
    debugger;
    const _authenticationResult: OperationResult = new OperationResult(false, '');
    if (this.resetPassword) {
      if(this.resetPassword.confirmPassword !==this.resetPassword.newPassword){
        this.errorMessage = "Please ensure your passwaord confirmation and the new password are the same";
      }else {
        this.errorMessage = null;
      this.membershipService.updatePassword(this.resetPassword)
        .subscribe((res: any) => {
          _authenticationResult.succeeded = res.succeeded;
          _authenticationResult.message = res.message;
          this.errorMessage = res.message;
          if (_authenticationResult.succeeded) {
            this.router.navigate(['login']);
          }
        });
      }
    }
  }
}
