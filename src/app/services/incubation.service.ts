
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
import { IncubatorRequirement } from '../requirements/incubation/incubatorRequirement';
import { WorkItemIncubatorComments } from '../requirements/incubation/workItemIncubatorComments';
import { QuarterMilestone } from '../requirements/incubation/quarterMilestone';
import { QuardrantQuarter } from '../requirements/incubation/quardrantQuarter';
import { IncubatorQuardrant } from '../requirements/incubation/incubatorQuardrant';
import { Constants } from '../utilities/constants';
import { CommentResponse } from '../requirements/incubation/commentResponse';
@Injectable()
export class IncubationService {

  private _incubationRequirementAPI = Constants.ServerURL +  '/api/incubation/requirement/';
  private _updateincubationRequirementAPI = Constants.ServerURL +  '/api/incubation/updateQuardrant';
  private _incubationAddcommentAPI = Constants.ServerURL +  '/api/incubation/addCommentt';
  private _incubationAddMilestoneAPI = Constants.ServerURL +  '/api/incubation/addMilestone';
  private _incubationAddQuarterAPI = Constants.ServerURL +  '/api/incubation/addQuarter';
  private _incubationAddCommentResponseAPI = Constants.ServerURL +  '/api/incubation/addCommentResponse';
  private _incubationInterventionRequirementResponseAPI = Constants.ServerURL +  '/api/incubation/interventionReportRequirement';
  public incubationRequirement: WorkItemRequirements;
  public errorMessage: string;
  constructor(public requirementService: DataService, private http: Http) { }

  requirement(newUser: WorkItem) {
    this.requirementService.set(this._incubationRequirementAPI);
    return this.requirementService.post(JSON.stringify(newUser));
  }
  updateQuardrant(newUser: IncubatorQuardrant) {
    this.requirementService.set(this._updateincubationRequirementAPI);
    return this.requirementService.put(newUser);
  }

  addComment(comment: WorkItemIncubatorComments) {
    this.requirementService.set(this._incubationAddcommentAPI);
    return this.requirementService.post(JSON.stringify(comment));
  }
  addMilestone(comment: QuarterMilestone) {
    this.requirementService.set(this._incubationAddMilestoneAPI);
    return this.requirementService.post(JSON.stringify(comment));
  }
  addQuarter(quarter: QuardrantQuarter) {
    this.requirementService.set(this._incubationAddQuarterAPI);
    return this.requirementService.post(JSON.stringify(quarter));
  }
  addCommentResponse(commentResponse: CommentResponse) {
    this.requirementService.set(this._incubationAddCommentResponseAPI);
    return this.requirementService.post(JSON.stringify(commentResponse));
  }

  GetInterventionReportRequirements(incubationRequirement: IncubatorRequirement){
    this.requirementService.set(this._incubationInterventionRequirementResponseAPI);
    return this.requirementService.post(JSON.stringify(incubationRequirement));
  }
}
