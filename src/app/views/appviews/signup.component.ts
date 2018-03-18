import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Registration } from '../account/registration';
import { OperationResult } from '../../utilities/operationResult';
import { MembershipService } from '../../services/membership.service';
import { NotificationService } from '../../services/notification.service';

declare var jQuery: any;

@Component({
  selector: 'signup',
  templateUrl: 'signup.component.html'
})
export class SignUpComponent implements OnInit  {

    public _newUser: Registration;
    public errorMessage: String;
    public successMessage: String;
    constructor(public membershipService: MembershipService,
                public notificationService: NotificationService,
                public router: Router) { }

    ngOnInit() {
        this._newUser = new Registration('', '', '','');
    }

        register(): void {
          jQuery('#loader').modal('show');
        var _registrationResult: OperationResult = new OperationResult(false, '');
        this.membershipService.register(this._newUser)
            .subscribe((res:any) => {
                _registrationResult.succeeded = res.succeeded;
                _registrationResult.message = res.message;
                jQuery('#loader').modal('hide');
            if (_registrationResult.succeeded) {
                  this.router.navigate(['confirmaccount']);
                }else {
                    this.errorMessage = _registrationResult.message;
                }
            });
    };

}
