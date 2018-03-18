import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';
import { Registration } from '../account/registration';
import { OperationResult } from '../../utilities/operationResult';
import { MembershipService } from '../../services/membership.service';
import { RequiremntService } from '../../services/requirements.service';
import { Client } from '../../workItem/client';
import { WorkItem } from '../../workItem/workItem';
import { WorkItemRequirements } from '../../requirements/workItemRequirement';
import { WorkItemField } from '../../requirements/field';
import { NotificationService } from '../../services/notification.service';
import { WorkItemStatusInfor } from '../../workItem/workItemStatusInfor';
import { StarterViewComponent } from './starterview.component';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { WorkItemStage } from '../../requirements/workItemStage';
import { saveAs } from 'file-saver';
import { WorkItemDocument } from '../../requirements/workIremDocument';
import { Response } from '@angular/http';
import { User } from '../account/user';
import { CommonLists } from '../../utilities/sefate.constants.Lists';
import { StageUpdateView } from '../../requirements/stageUpdate';
import { DocumentService } from '../../services/document.service';
import { FieldSetGroup } from '../../requirements/fieldSetGroup';
import { FieldSet } from '../../requirements/fieldSet';
import { Customvalidators } from '../../utilities/validation';

declare var jQuery: any;

@Component({
  selector: 'clientRequirements',
  templateUrl: 'clientRequirements.component.html'
})
export class ClientRequirements implements OnInit {

  public workItemRequirement: WorkItemRequirements;
  private _workItem: WorkItem;
  public tabIndex: number;
  errorMessage: String;
  isDataAvailable: Boolean = false;
  public requirementForm: FormGroup;
  public role: number;
  public lists: CommonLists;
  public showUserDocuments: boolean;
  public showDocuments: boolean;
  // rejection form
  public rejectionForm: FormGroup;
  public stageUpdateView: StageUpdateView;
  public reason: FormControl;
  public comment: FormControl;
  public nav: any;
  public showControlPanel: Boolean;


  constructor(public router: Router, public requirementService: RequiremntService,
    public notificationService: NotificationService, public documentService: DocumentService,
    private route: ActivatedRoute, private builder: FormBuilder) {
    this.nav = document.querySelector('nav.navbar');

  }
  ngOnInit() {

    const user: User = JSON.parse(localStorage.getItem('user'));
    if (user === null) {
      jQuery('#loader').modal('hide');
      this.router.navigate(['login']);
    }else {
      this.role = user.userRoleViews[0].roleID;
      jQuery('#loader').modal('show');
    }

    const url = this.router.parseUrl(this.router.url);
    const params = url.queryParams;
    const WorkItemID: number = +params['workItemID'];
    const StatusID: number = +params['stausID'];
    const Status: string = params['statusText'];
    const StatusCode: string = params['statusCode'];
    this.showUserDocuments = this.role === 1;
    this.showDocuments = !this.showUserDocuments;
    const client: Client = new Client(1, '1');
    const status: WorkItemStatusInfor = new WorkItemStatusInfor(StatusID, Status, StatusCode);
    this._workItem = new WorkItem(client, status, WorkItemID, this.role, user.id);
    this.tabIndex = -1;
    this.workItemRequirement = new WorkItemRequirements();
    this.workItemRequirement.currentWorkItemStage = new WorkItemStage();
    this.requirementForm = new FormGroup({});
    this.lists = new CommonLists();
    this.GetWorkItemRequirements();
    this._formGroup();
    this.stageUpdateView = new StageUpdateView();
    this.nav.className += 'white-bg';
  }


  //Form Group
  _formGroup() {
    this.reason = new FormControl('', Validators.required);
    this.comment = new FormControl('', Validators.required);
    this.rejectionForm = this.builder.group({
      comment: this.comment,
      reason: this.reason,
    });
  }

  ShowControlPanel(): Boolean{
    const user: User = JSON.parse(localStorage.getItem('user'));
    debugger;
    const url = this.router.parseUrl(this.router.url);
    const params = url.queryParams;
    if (user === undefined) {
      this.router.navigate(['login']);
    }else {
      this.role = user.userRoleViews[0].roleID;
      if (this.role === 1) {
        const StatusID: number = +params['stausID'];
        if (StatusID === 1 || StatusID === 5) {
          return true;
        }
      }else {
        return false;
      }
    }
  }

  GetWorkItemRequirements(): void {
    this.requirementService.requirement(this._workItem)
      .subscribe((res: any) => {
        this.workItemRequirement.requirementsTabs = res.requirementsTabs;
        this.workItemRequirement.workItemStages = res.workItemStages;
        this.workItemRequirement.documentsTab = res.documentsTab;
        this.workItemRequirement.hasDocuments = res.hasDocuments;
        this.workItemRequirement.currentWorkItemStage = res.currentWorkItemStage;
        const valid = this.ValidateRequirement();
        this.workItemRequirement.isValid = valid;
        jQuery('#loader').modal('hide');
      });
  };
  UpdateRequirement(): void {
    jQuery('#loader').modal('show');
    const _authenticationResult: OperationResult = new OperationResult(false, '');
    const valid = this.ValidateRequirement();
    debugger;
    this.workItemRequirement.isValid = valid;
    this.requirementService.updateRequirement(this.workItemRequirement)
      .subscribe((res: any) => {
        _authenticationResult.succeeded = res.succeeded;
        _authenticationResult.message = res.message;
        if (_authenticationResult.succeeded) {
          jQuery('#loader').modal('hide');
          this.errorMessage = res.message;
          // jQuery('#errorModal').modal('show');
        } else {
          jQuery('#loader').modal('hide');
          this.errorMessage = res.message;
          // jQuery('#errorModal').modal('show');
        }
      });
  };

  OnfieldChanged(event: any, currentField: WorkItemField): void {
    // currentField.isNew = !currentField.isNew;
    currentField.isDirty = true;
  }
  changeListener(event: any) {

  }
  addFile(event: any, field: WorkItemField): void {
    const fi = event.target;
    if (fi.files && fi.files[0]) {
      const fileToUpload = fi.files[0];
      if (field.fieldValue != null && field.fieldValue.length > 0) {
        field.isNew = false;
      }
      field.fieldValue = fileToUpload.name;
      field.isDirty = field.isDirty;
      this.requirementService
        .upload(fileToUpload, field)
        .subscribe(res => {
          console.log(res);
        });

      if (field.fieldValue === '' || field.fieldValue === null) {
        if (field.isRequired) {
          field.isValid = false;
          field.isDirty = false;
          field.errorMessage = field.name + ' ' + 'is required';
        } else {
        }
      } else {
        field.errorMessage = '';
        field.isValid = true;
      }
    }
  }
  updateRequirementAfterSelect(event: any, field: WorkItemField, tabIndex: number, fieldSetGroup: FieldSetGroup, fieldSet: FieldSet) {
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

  private setActiveTab(index: number) {
    for (let k = 0; k < this.workItemRequirement.requirementsTabs.length; k++) {
      this.workItemRequirement.requirementsTabs[k].active = false;
    }

    for (let k = 0; k < this.workItemRequirement.requirementsTabs.length; k++) {
      if (k === index) {
        this.workItemRequirement.requirementsTabs[k].active = true;
      }
    }
  }

  public ValidateField(currentField: WorkItemField): void {
    if (currentField.fieldValue === '' && currentField.isRequired) {
      currentField.isValid = false;
      currentField.errorMessage = currentField.name + 'is required';
    }
  }

  public ValidateRequirement(): boolean {
    let result = true;
    for (let k = 0; k < this.workItemRequirement.requirementsTabs.length; k++) {
      const currentTab = this.workItemRequirement.requirementsTabs[k];
      if (currentTab && currentTab.fieldSetGroups) {
        for (let j = 0; j < currentTab.fieldSetGroups.length; j++) {
          const currentFieldSetGroup = currentTab.fieldSetGroups[j];
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
    }
    return result;
  }

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

  onSubmit() {
    jQuery('#loader').modal('show');
    //this.toggleLoader();
    const valid = this.ValidateRequirement();
    this.workItemRequirement.isValid = valid;
    if (valid) {
      this.stageUpdateView.fromStage = this._workItem.workItemStatusInfor.status;
      this.stageUpdateView.toStage = this.workItemRequirement.currentWorkItemStage.nextStage;
      const user: User = JSON.parse(localStorage.getItem('user'));
      this.stageUpdateView.currentUser = user.id;
      this.stageUpdateView.workItem = this._workItem;
      const _authenticationResult: OperationResult = new OperationResult(false, '');
      this.requirementService.submitWorkItem(this.stageUpdateView)
        .subscribe((res: any) => {
          jQuery('#loader').modal('hide');
          //this.errorMessage = res.message;
          _authenticationResult.succeeded = res.succeeded;
          _authenticationResult.message = res.message;
          if (_authenticationResult.succeeded) {
            this.router.navigate(['submitted']);
          } else {
            jQuery('#loader').modal('hide');
            //jQuery('#errorModal').modal('show');
          }
        });

    } else {
      jQuery('#loader').modal('hide');
      this.errorMessage = 'Please fix the validation errors and try again';
      jQuery('#errorModal').modal('show');
    }
  }

  RejectWorkItem(): void {
    jQuery('#loader').modal('hide');
    jQuery('#rejection').modal('hide');
    debugger;
    this.stageUpdateView.isReject = true;
    this.stageUpdateView.fromStage = this._workItem.workItemStatusInfor.status;
    this.stageUpdateView.toStage = this.workItemRequirement.currentWorkItemStage.previousStage;
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.stageUpdateView.currentUser = user.id;
    this.stageUpdateView.workItem = this._workItem;
    const _authenticationResult: OperationResult = new OperationResult(false, '');
    this.requirementService.updateItemStatus(this.stageUpdateView)
      .subscribe((res: any) => {
        _authenticationResult.succeeded = res.succeeded;
        _authenticationResult.message = res.message;
        jQuery('#loader').modal('hide');
        this.errorMessage = res.message;
        // jQuery('#errorModal').modal('show');
        if (_authenticationResult.succeeded) {
          this.errorMessage = res.message;
          this.router.navigate(['starterview']);
        } else {
          jQuery('#errorModal').modal('show');
        }
      });
    //  }
  };

  ApproveWorkItem(): void {
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (user === undefined) {
      this.router.navigate(['login']);
    }
    jQuery('#loader').modal('show');
    this.stageUpdateView.fromStage = this._workItem.workItemStatusInfor.status;
    this.stageUpdateView.toStage = this.workItemRequirement.currentWorkItemStage.nextStage;
    this.stageUpdateView.currentUser = user.id;
    this.stageUpdateView.workItem = this._workItem;
    const _authenticationResult: OperationResult = new OperationResult(false, '');
    this.requirementService.updateItemStatus(this.stageUpdateView)
      .subscribe((res: any) => {
        _authenticationResult.succeeded = res.succeeded;
        _authenticationResult.message = res.message;
        jQuery('#loader').modal('hide');
        if (_authenticationResult.succeeded) {
          //this.errorMessage = res.message;
          this.router.navigate(['starterview']);
        } else {
          // this.notificationService.printErrorMessage(_authenticationResult.message);
        }
      });
    //  }
  };

  ShowModel(): void {
    document.getElementById('openModalButton').click();
  }
  public DownloadDocument(field: WorkItemField) {
    const _authenticationResult: OperationResult = new OperationResult(false, '');
    this.requirementService.getTestPdfFile(field.workItemDocument)
      .subscribe((res: any) => {
        debugger;
        const blob = new Blob([res], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      });
  }

  downloadBlaBlasCSV(document: WorkItemDocument) {
    this.requirementService.downloadBlaBlasCSV(document).subscribe(
      (data) => { this.openFileForDownload(data); },
      (error: any) => {
      });
  }

  openFileForDownload(data: Response) {
    const blob = new Blob([data], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'Some.csv');
  }

  public UpdateDocumentStatus(documentField: WorkItemField): void {
    jQuery('#loader').modal('show');
    documentField.workItemDocument.documentApproved = !documentField.workItemDocument.documentApproved;
    switch (documentField.workItemDocument.documentStatus.statusID) {
      case 0:
        documentField.workItemDocument.documentStatus.statusID = 1;
        break;
      case 1:
        documentField.workItemDocument.documentStatus.statusID = 2;
        break;
      case 2:
        documentField.workItemDocument.documentStatus.statusID = 3;
        break;
      case 3:
        documentField.workItemDocument.documentStatus.statusID = 1;
        break;
    }

    this.documentService.updateItemStatus(documentField.workItemDocument)
      .subscribe((res: any) => {
        if (res.succeeded) {
          jQuery('#loader').modal('hide');
          this.errorMessage = res.message;
          //jQuery('#errorModal').modal('show');
        } else {
          jQuery('#loader').modal('hide');
          this.errorMessage = res.message;
          //jQuery('#errorModal').modal('show');
        }
      });
  }
  public GetFileById(id: WorkItemDocument) {
    window.open(this.requirementService.GetDownloadfileUrl(id.documentID));
    document.getElementById("addProductCloseButton").click();
  }

  public GetDocumentStatusCSS(statusID: number) {
    switch (statusID) {
      case 0:
        return 'btn btn-warning btn-xs';
      case 1:
        return 'btn btn-info btn-xs';
      case 2:
        return 'btn btn-success btn-xs';
      case 3:
        return 'btn btn-danger btn-xs';
    }
  }
  public GetDocumentStatusText(statusID: number) {
    switch (statusID) {
      case 0:
        return 'In Review';
      case 1:
        return 'In progress';
      case 2:
        return 'Approved';
      case 3:
        return 'Rejected';
    }
  }

  NextTab() {

  }
  PreviousTab() {

  }
}
