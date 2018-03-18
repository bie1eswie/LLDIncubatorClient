import { Http, Response, RequestOptionsArgs, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { WorkItemRequirements } from '../requirements/workItemRequirement';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Constants } from '../utilities/constants';

@Injectable()
export class DataService {

    public _pageSize: number;
    public _baseUri: string;

    constructor(public http: Http) {

    }

        private prepareOptions = (options: RequestOptionsArgs): RequestOptionsArgs => {
        options = options || {};

        if (!options.headers) {
            options.headers = new Headers();
        }

        options.headers.append('Content-Type', 'application/json');

        return options;
    }

    set(baseUri: string, pageSize?: number): void {
        this._baseUri = baseUri;
        this._pageSize = pageSize;
    }

    get(page: number) {
        const uri = this._baseUri;
        const options = this.prepareOptions(null);
        return this.http.get(uri, options)
            .map(response => (<Response>response).json());
    }

    post(data?: any, mapJson: boolean = true) {
        let options = this.prepareOptions(null);
        if (mapJson)
            return this.http.post(this._baseUri, data,options)
                .map(response => <any>(<Response>response).json());
        else
            return this.http.post(this._baseUri, data);
    }

    postReq(data?: any, mapJson: boolean = true): Promise<WorkItemRequirements> {
        const options = this.prepareOptions(null);
            return this.http.post(this._baseUri, data, options)
              .toPromise()
              .then(this.extractData)
              .catch(this.handleErrorPromise);
    }

private extractData(res: Response) {
        const body = res.json();
        return body.data || {};
    }

    put(data?: any, mapJson: boolean = true) {
        let options = this.prepareOptions(null);
        if (mapJson)
            return this.http.put(this._baseUri, data,options)
                .map(response => <any>(<Response>response).json());
        else
            return this.http.post(this._baseUri, data);
    }


    delete(id: number) {
        return this.http.delete(this._baseUri + '/' + id.toString())
            .map(response => <any>(<Response>response).json())
    }

    deleteResource(resource: string) {
        return this.http.delete(resource)
            .map(response => <any>(<Response>response).json())
    }

private handleErrorPromise (error: Response | any) {
  console.error(error.message || error);
  return Promise.reject(error.message || error);
  }
}
