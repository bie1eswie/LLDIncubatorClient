import { Http, Response, Request } from '@angular/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Registration } from '../views/account/registration';
import { User } from '../views/account/user';
import { ResetPassword } from '../views/account/resetPassword';
import { ConfirmAccount } from '../views/account/confirmAccount';
import { Constants } from '../utilities/constants';

@Injectable()
export class MembershipService {

    private _accountRegisterAPI: string = Constants.ServerURL +  '/api/account/register/';
    private _accountLoginAPI: string = Constants.ServerURL +  '/api/account/authenticate/';
    private _accountLogoutAPI: string = Constants.ServerURL +  '/api/account/logout/';
    private _accountUpdatePasswordAPI: string = Constants.ServerURL +  '/api/account/updatePassword/';
    private _accountUnlockUserAPI: string = Constants.ServerURL +  '/api/account/unlock/';
    constructor(public accountService: DataService) { }

    register(newUser: Registration) {

        this.accountService.set(this._accountRegisterAPI);
        return this.accountService.post(JSON.stringify(newUser));
    }

    login(creds: User) {
        this.accountService.set(this._accountLoginAPI);
        return this.accountService.post(JSON.stringify(creds));
    }

    logout() {
        this.accountService.set(this._accountLogoutAPI);
        return this.accountService.post(null, false);
    }

    isUserAuthenticated(): boolean {
        var _user: any = localStorage.getItem('user');
        if (_user != null)
            return true;
        else
            return false;
    }

    getLoggedInUser(): User {
        var _user: User;

        if (this.isUserAuthenticated()) {
            var _userData = JSON.parse(localStorage.getItem('user'));
            _user = new User(_userData.Username, _userData.Password);
        }

        return _user;
    }

    updatePassword (passwordReset: ResetPassword){
        this.accountService.set(this._accountUpdatePasswordAPI);
        return this.accountService.post(JSON.stringify(passwordReset));
    }

    unlockUser (confirm: ConfirmAccount){
        this.accountService.set(this._accountUnlockUserAPI);
        return this.accountService.post(JSON.stringify(confirm));
    }
}
