
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
import { WorkItemGridView } from '../requirements/workItemGrid';
import { Constants } from '../utilities/constants';


@Injectable()
export class TimelineService {

  private _workitemGridAPI  = Constants.ServerURL +  '/api/workItem/workItems';

  public workitemsGrid: WorkItemGridView;

  constructor(public workItemService: DataService, private http: Http) { }

      workItemGrid() {
        this.workItemService.set(this._workitemGridAPI);
        return this.workItemService.get(10);
    }
}
