
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { WorkItemRequirements } from '../requirements/workItemRequirement';
import { WorkItem } from '../workItem/workItem';
import { WorkItemField } from '../requirements/field';
import { DocumentField } from '../requirements/documentField';
import { StarterViewComponent } from '../views/appviews/starterview.component';
import { Http, Response, RequestOptionsArgs, ResponseContentType, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { WorkItemDocument } from '../requirements/workIremDocument';
import { StageUpdateView } from '../requirements/stageUpdate';
import { Constants } from '../utilities/constants';
@Injectable()
export class RequiremntService {

        private _workitemRequirementAPI  = Constants.ServerURL +  '/api/workItem/requirement/';
        private _updateWorkitemRequirementAPI  = Constants.ServerURL + '/api/workItem/updateWorkItemRequirements';
        private _updateWorkitemStatusAPI  = Constants.ServerURL +  '/api/workItem/updateStatus';
        private _saveWorkitemDocumentAPI  = Constants.ServerURL +  '/api/workItem/uploadDocument';
        private _downloadWorkitemDocumentAPI  = Constants.ServerURL +  '/api/workItem/';
        private _submitWorkitemAPI  = Constants.ServerURL +  '/api/workItem/submit';
        public workItemRequirement: WorkItemRequirements;
        public errorMessage: string;
        constructor(public requirementService: DataService, private http: Http) { }

    requirement(newUser: WorkItem) {
        this.requirementService.set(this._workitemRequirementAPI);
        return this.requirementService.post(JSON.stringify(newUser));
    }
    updateRequirement(newUser: WorkItemRequirements) {
        this.requirementService.set(this._updateWorkitemRequirementAPI);
        return this.requirementService.put(newUser);
    }
    upload(fileToUpload: any, field: WorkItemField) {
        const input = new FormData();
        // const options = this.prepareOptions(null);
        input.append('file', fileToUpload);
        input.append('field', JSON.stringify(field));
        // const data: DocumentField = new DocumentField(field, input);
        return this.http
            .post(this._saveWorkitemDocumentAPI, input);

    }

    private prepareOptions = (options: RequestOptionsArgs): RequestOptionsArgs => {
    options = options || {};

    if (!options.headers) {
        options.headers = new Headers();
    }

    options.headers.append('Content-Type', 'application/json');

    return options;
}

    updateItemStatus(workItem: StageUpdateView) {
        this.requirementService.set(this._updateWorkitemStatusAPI);
        return this.requirementService.put(JSON.stringify(workItem));
    }

    submitWorkItem(workItem: StageUpdateView) {
        this.requirementService.set(this._submitWorkitemAPI);
        return this.requirementService.put(JSON.stringify(workItem));
    }

getTestPdfFile(document:WorkItemDocument) {
        const url = this._downloadWorkitemDocumentAPI;
        return this.http.post(url, JSON.stringify(document), { responseType: ResponseContentType.Blob })
                        .map(res => res.blob());
    }

downloadBlaBlasCSV(document: WorkItemDocument) {
        const options = {responseType: ResponseContentType.ArrayBuffer };
        return this.http.post(this._downloadWorkitemDocumentAPI, JSON.stringify(document), options)
        .map((res: Response) => res['_body'])
        .catch((err: Response) => Observable.throw(err.json()));
    }

  public GetDownloadfileUrl(id: number): string {
        return `${this._downloadWorkitemDocumentAPI}${id}`;
    }
}
