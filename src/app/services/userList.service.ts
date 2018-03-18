import {Injectable, Component}      from '@angular/core';
import {Http, Request, RequestMethod, Response, RequestOptionsArgs, Headers}    from '@angular/http';
import 'rxjs/Rx';
import {Observable}   from 'rxjs/Observable';
import { Registration } from '../views/account/registration';
import { DataService } from './data.service';
import { Constants } from '../utilities/constants';

@Injectable()
export class UserListService {

    public _saveUrl: string = Constants.ServerURL +  '/api/userList/PostUser/';
    public _updateUrl: string = Constants.ServerURL +  '/api/userList/PutUser/';
    public _getUrl: string =  Constants.ServerURL + '/api/userList/getUsers';
    public _getByIdUrl: string = Constants.ServerURL +  '/api/userList/GetUserByID/';
    public _deleteByIdUrl: string = Constants.ServerURL +  '/api/userList/DeleteUserByID/';
    public _getRolesUrl: string = Constants.ServerURL +  '/api/userList/getRoles';
    public headers: Headers;
    constructor(private _http: Http, public userServive: DataService) {
    }
    //Get

    getUsers() {
        this.userServive.set(this._getUrl);
        return this.userServive.post(new Registration('11','11','11','11'));
    }

    getRole() {
        this.userServive.set(this._getRolesUrl);
        return this.userServive.get(10);
    }


    //GetByID
    getUserByID(id: string): Observable<Registration> {
        //debugger
        const getByIdUrl = this._getByIdUrl + '/' + id;
        return this._http.get(getByIdUrl)
            .map(res => <Registration>res.json())
            .catch(this.handleError);
    }

    private prepareOptions = (options: RequestOptionsArgs): RequestOptionsArgs => {
        options = options || {};

        if (!options.headers) {
            options.headers = new Headers();
        }

        options.headers.append('Content-Type', 'application/json');

        return options;
    }

    //Post
    saveUser(user: Registration) {
        this.userServive.set(this._saveUrl);
        return this.userServive.post(JSON.stringify(user));
    }

    //Put
    updateUser(contact: Registration, id: string): Observable<string> {
        //debugger
        var updateUrl = this._updateUrl + '/' + id;
        var body = JSON.stringify(contact);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        //http.post(url: string, body: string, options ?: RequestOptionsArgs): Observable<Response>
        return this._http.put(updateUrl, body, { headers: headers })
            .map(response => response.json().message)
            .catch(this.handleError);
    }

    //Delete
    deleteUser(id: string): Observable<string> {
        //debugger
        var deleteByIdUrl = this._deleteByIdUrl + '/' + id

        //http.post(url: string, options ?: RequestOptionsArgs): Observable<Response>
        return this._http.delete(deleteByIdUrl)
            .map(response => response.json().message)
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.json().error || 'Opps!! Server error');
    }
}
