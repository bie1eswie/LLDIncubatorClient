import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';
import { Registration } from '../../../account/registration';
import { OperationResult } from '../../../../utilities/operationResult';
import { MembershipService } from '../../../../services/membership.service';
import { RequiremntService } from '../../../../services/requirements.service';
import { Client } from '../../../../workItem/client';
import { WorkItem } from '../../../../workItem/workItem';
import { WorkItemRequirements } from '../../../../requirements/workItemRequirement';
import { WorkItemField } from '../../../../requirements/field';
import { NotificationService } from '../../../../services/notification.service';
import { WorkItemStatusInfor } from '../../../../workItem/workItemStatusInfor';
import { StarterViewComponent } from '../../starterview.component';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { WorkItemStage } from '../../../../requirements/workItemStage';
import { saveAs } from 'file-saver';
import { WorkItemDocument } from '../../../../requirements/workIremDocument';
import { Response, ResponseContentType, Http } from '@angular/http';
import { User } from '../../../account/user';
import { CommonLists } from '../../../../utilities/sefate.constants.Lists';
import { StageUpdateView } from '../../../../requirements/stageUpdate';
import { DocumentService } from '../../../../services/document.service';
import { FieldSetGroup } from '../../../../requirements/fieldSetGroup';
import { FieldSet } from '../../../../requirements/fieldSet';
import { Customvalidators } from '../../../../utilities/validation';
import { InterventionReport } from '../../../../requirements/incubation/interventionReport/InterventionReport';
import { IncubationService } from '../../../../services/incubation.service';
import { IncubatorRequirement } from '../../../../requirements/incubation/incubatorRequirement';
import * as FileSaver from 'file-saver';
import { Constants } from '../../../../utilities/constants';

declare var jQuery: any;

@Component({
  selector: 'interventionReport',
  templateUrl: 'interventionReport.component.html'
})
export class InterventionReportComponent implements OnInit {

  public interventionReport: InterventionReport;
  private _workItem: WorkItem;
  public errorMessage: String;
  public incubatorRequirement: IncubatorRequirement;
  public nav: any;

  constructor(public router: Router,private http: Http, public requirementService: IncubationService,
    public notificationService: NotificationService, public documentService: DocumentService,
    private route: ActivatedRoute, private builder: FormBuilder) {
    this.nav = document.querySelector('nav.navbar');

  }
  ngOnInit() {

    this.interventionReport = new InterventionReport();
    this._workItem = JSON.parse(localStorage.getItem('workItem'));
    this.incubatorRequirement = JSON.parse(localStorage.getItem('incubatorRequirement'));
    debugger;
    this.GetWorkItemReportRequirements();
  }

  AddNewIssue(fieldsetGroup: FieldSetGroup) {
      let fieldset = new FieldSet();
       fieldset.workItemFields = (fieldsetGroup.fieldSets[0].workItemFields);
      fieldset.name = 'Aristing issue';

      for (let i = 0; i < fieldset.workItemFields.length; i++) {
        fieldset.workItemFields[i].fieldValue = '';
      }
      fieldsetGroup.fieldSets.push(fieldset);
  }

  public downloadFilePost() {

    let url = Constants.ServerURL + '/api/document/generateInterventionReport';
    this.http.post(url, this.interventionReport, { responseType: ResponseContentType.Blob })
    .subscribe(
    (response: any) => {
        let blob = response.blob();
        let filename = 'report.docx';
        FileSaver.saveAs(blob, filename);
    });
}

  public GetFileById() {
    this.documentService.generateInterventionReport(this.interventionReport)
    .subscribe((res: any) => {
      if (res.succeeded) {
        debugger;
        let tt= res;
      } else {
      }
    });
  }

  GetWorkItemReportRequirements(): void {
    this.requirementService.GetInterventionReportRequirements(this.incubatorRequirement)
      .subscribe((res: any) => {
        this.interventionReport.fieldSetGroups = res.fieldSetGroups;
        this.interventionReport.workItem = this._workItem;
        this.interventionReport.client = this._workItem.primaryClient;
        const valid = this.ValidateRequirement();
        jQuery('#loader').modal('hide');
      });
  };

  onFieldBlur(currentField: WorkItemField) {
    if (currentField.fieldValue === '' || currentField.fieldValue === null) {
      if (currentField.isRequired) {
        currentField.isValid = false;
        currentField.isDirty = false;
        if (currentField.errorMessage === '') {
          currentField.errorMessage = '<small>';
        }
        currentField.errorMessage = currentField.name + ' ' + 'is required. <br>';
      } else {
      }
    } else {
      currentField.errorMessage = '';
      currentField.isValid = true;
    }
    if (currentField.fieldType === 'Email') {
      const error = Customvalidators.emailStringValidator(currentField.fieldValue);
      if (error !== '') {
        if (currentField.errorMessage === '') {
          currentField.errorMessage = '<small>';
        }
        currentField.errorMessage = currentField.errorMessage + error + '.';
        currentField.isValid = false;
        currentField.isDirty = false;
        currentField.errorMessage = currentField.errorMessage + '</small>';
      }
    }
  }

  public ValidateField(currentField: WorkItemField): void {
    if (currentField.fieldValue === '' && currentField.isRequired) {
      currentField.isValid = false;
      currentField.errorMessage = currentField.name + 'is required';
    }
  }

  updateRequirementAfterSelect(event: any, field: WorkItemField, fieldSetGroup: FieldSetGroup, fieldSet: FieldSet) {
    field.isDirty = true;
    if (field.hasDependends) {
      //this.UpdateRequirement();
      //this.GetWorkItemRequirements();
      this.ValidateRequirement();
      //this.setActiveTab(tabIndex);
      debugger;
      if (field.fieldSetGroup) {
        for (let i = 0; i < field.fieldSetGroup.fieldSets.length; i++) {
          const currentDep = field.fieldSetGroup.fieldSets[i];
          for (let k = 0; k < fieldSetGroup.fieldSets.length; k++) {
            const currentSet = fieldSetGroup.fieldSets[k];
            if (currentDep.code === currentSet.code) {
              if (field.fieldValue === 'YES' || field.fieldValue === 'Other') {
                currentSet.isHidden = false;
              } else {
                currentSet.isHidden = true;
              }
            }
          }
        }
      }
    }

    fieldSet.isDirty = true;
    fieldSetGroup.isDirty = true;
    field.isDirty = true;
  }
  OnfieldChanged(event: any, currentField: WorkItemField): void {
    // currentField.isNew = !currentField.isNew;
    currentField.isDirty = true;
  }
  changeListener(event: any) {

  }

  UpdateRequirement(){

  }

  GenerateReport(){

  }

  public ValidateRequirement(): boolean {
    let result = true;
      if (this.interventionReport && this.interventionReport.fieldSetGroups) {
        for (let j = 0; j < this.interventionReport.fieldSetGroups.length; j++) {
          const currentFieldSetGroup = this.interventionReport.fieldSetGroups[j];
          for (let t = 0; t < currentFieldSetGroup.fieldSets.length; t++) {
            const currentFieldSet = currentFieldSetGroup.fieldSets[t];
            if (currentFieldSet && !currentFieldSet.isHidden) {
              if (currentFieldSet.workItemFields) {
                for (let i = 0; i < currentFieldSet.workItemFields.length; i++) {
                  const currentField = currentFieldSet.workItemFields[i];
                  if (currentField.fieldValue === '' || currentField.fieldValue === null) {
                    if (currentField.isRequired) {
                      currentField.isValid = false;
                      currentField.isDirty = false;
                      currentField.errorMessage = currentField.name + ' ' + 'is required';
                      result = result && false;
                    } else {
                      result = result && true;
                      currentField.errorMessage = '';
                    }
                  }
                }
              }
            }
          }
        }
      }
    return result;
  }
}
