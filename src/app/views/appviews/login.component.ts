import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../account/user';
import { OperationResult } from '../../utilities/operationResult';
import { MembershipService } from '../../services/membership.service';
import { NotificationService } from '../../services/notification.service';
import { Client } from '../../workItem/client';

declare var jQuery: any;

@Component({
  selector: 'login',
  templateUrl: 'login.template.html'
})
export class LoginComponent implements OnInit {
  public _user: User;
  public errorMessage: String;
  constructor(public membershipService: MembershipService,
    public notificationService: NotificationService,
    public router: Router) { }

  ngOnInit() {
    jQuery('#loader').modal('hide');
    this._user = new User('', '');
  }

  login(): void {
    var _authenticationResult: OperationResult = new OperationResult(false, '');
    jQuery('#loader').modal('show');
    this.membershipService.login(this._user)
      .subscribe((res: any) => {
        _authenticationResult.succeeded = res.succeeded;
        _authenticationResult.message = res.message;
        this.errorMessage = res.message;
        jQuery('#loader').modal('hide');
        if (_authenticationResult.succeeded) {
          localStorage.setItem('user', JSON.stringify(res.user));
          const user: User = JSON.parse(localStorage.getItem('user'));
          const role = user.userRoleViews[0].roleID;
          if (res.workItem.workItemStatusInfor && (res.workItem.workItemStatusInfor.statusID >= 7)) {
            localStorage.setItem('user', JSON.stringify(res.user));
            localStorage.setItem('workItem', JSON.stringify(res.workItem));
            this.router.navigate(['/dashboards/dashboard2']);
          }else if (role === 1) {
            localStorage.setItem('workItem', JSON.stringify(res.workItem));
            this.router.navigate(['workItem'], {
              queryParams: {
                workItemID: res.workItem.workItemID,
                stausID: res.workItem.workItemStatusInfor.statusID,
                statusCode: res.workItem.workItemStatusInfor.statusCode,
                statusText: res.workItem.workItemStatusInfor.status,
                clientId: res.workItem.primaryClient.clientID,
                registrationNo: res.workItem.primaryClient.registrationNo
              }
            });
          } else if (res.workItem.workItemStatusInfor && res.workItem.workItemStatusInfor.statusID === 7) {
            localStorage.setItem('user', JSON.stringify(res.user));
            this.router.navigate(['incubation']);
          } else {
            localStorage.setItem('user', JSON.stringify(res.user));
            this.router.navigate(['starterview']);
          }
        } else {
          this.notificationService.printErrorMessage(_authenticationResult.message);
        }
      });
  };
}
