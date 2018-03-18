import { Component, OnDestroy, OnInit, } from '@angular/core';
import { WorkItemGridView } from '../../requirements/workItemGrid';
import { ActivatedRoute, Router } from '@angular/router';
import { RequiremntService } from '../../services/requirements.service';
import { NotificationService } from '../../services/notification.service';
import { TimelineService } from '../../services/timeline.service';
import { HashLocationStrategy } from '@angular/common';
import { WorkItem } from '../../workItem/workItem';
import { OperationResult } from '../../utilities/operationResult';
import { element } from 'protractor';
import { GridPageResul } from '../../utilities/GridPage';
import { StatusReport } from '../../utilities/search/statusReport';
import { StatusRecord } from '../../utilities/search/statusRecord';
import { Client } from '../../workItem/client';
import { WorkItemDocumentStatusInfor } from '../../requirements/workItemDocumentStatusInfor';
import { WorkItemStatusInfor } from '../../workItem/workItemStatusInfor';
import { WorkItemDocument } from '../../requirements/workIremDocument';
import { Tabset } from '../../utilities/tabset.component';
import { StatusGridViewPage } from '../../requirements/statusGridViewPage';
import { StatusGridView } from '../../requirements/statusGridView';
import { User } from '../account/user';

declare var jQuery: any;

@Component({
  selector: 'starter',
  providers: [Tabset],
  templateUrl: 'starter.template.html',

})
export class StarterViewComponent implements OnDestroy, OnInit {

  public nav: any;
  public workItemsGrid: WorkItemGridView;
  public gridPageResuls: GridPageResul<WorkItem>[];
  public currentGridPageResul: GridPageResul<WorkItem>;
  public searchText = '';
  public pageSize : number = 10;
  public originalworkItemsGrid: WorkItemGridView;
  public statusReport: StatusReport;
  public currentProfile: WorkItem;
  public constructor(public router: Router, public workItemService: TimelineService,
    public notificationService: NotificationService, public requirementService: RequiremntService,
    private route: ActivatedRoute) {
    this.nav = document.querySelector('nav.navbar');
  }

  public ngOnInit(): any {
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (user === null) {
      jQuery('#loader').modal('hide');
      this.router.navigate(['login']);
    }else {
      jQuery('#loader').modal('show');
      // this.role = user.userRoleViews[0].roleID;
    }

    this.nav.className += " white-bg";
    this.gridPageResuls = [];
    this.currentGridPageResul = new GridPageResul<WorkItem>();
    this.workItemsGrid = new WorkItemGridView();
    this.originalworkItemsGrid = new WorkItemGridView();
    this.statusReport = new StatusReport();
    this.GetWorkItemGrid();
    jQuery('#profile').hide();
    const client: Client = new Client(1, '1');
    const status = new WorkItemStatusInfor(0, 'undefined', '1');
    this.currentProfile = new WorkItem(client, status, null, null, null);
     // jQuery('#loader').modal('hide');
  }

  public GetFileById(id: WorkItemDocument) {
    window.open(this.requirementService.GetDownloadfileUrl(id.documentID));
    document.getElementById("addProductCloseButton").click();
  }


  public ngOnDestroy(): any {
    this.nav.classList.remove("white-bg");
  }

  GetWorkItemGrid(): void {
    this.workItemService.workItemGrid()
      .subscribe((res: any) => {
        this.workItemsGrid.workItems = res.workItems;
        this.originalworkItemsGrid.workItems = res.workItems;
        this.workItemsGrid.statusGridViews = res.statusGridViews;
        debugger;
        // this.SetgridPageResuls();
        // this.setStatusReport();
        // this.currentGridPageResul = this.gridPageResuls[0];
        // this.searchText = '';
        jQuery('#loader').modal('hide');
      });
  };

  test(): void {
    debugger;
    const test = 'dd';
  }

  setStatusCSS(status: string): string {
    switch (status) {
      case '5':
        return 'label label-success';
      case '1':
        return 'label label-warning';
      case '3':
        return 'label label-info';
      case '4':
        return 'label label-info';
      case '6':
        return 'label label-primary';
      case '7':
        return 'label label-danger';
    }
  }

  setPage(page: StatusGridViewPage, tab: StatusGridView) {
    tab.currentPage = page;
    tab.currentPageIndex = page.pageNumber;
  }

  UpdateWorkItemStatus(workItem: WorkItem): void {
    const _authenticationResult: OperationResult = new OperationResult(false, '');
    debugger;
    localStorage.setItem('workItem', JSON.stringify(workItem));
    if (workItem.workItemStatusInfor.statusCode === '8') {
      this.router.navigate(['dashboards/dashboard2']);
    } else {
      this.router.navigate(['workItem'], {
        queryParams: {
          workItemID: workItem.workItemID,
          stausID: workItem.workItemStatusInfor.statusID,
          statusCode: workItem.workItemStatusInfor.statusCode,
          statusText: workItem.workItemStatusInfor.status,
          clientId: workItem.primaryClient.clientID,
          registrationNo: workItem.primaryClient.registrationNo
        }
      });
    }
    //  }
  };

  ViewWorkItem(workItem: WorkItem) {
    this.UpdateWorkItemStatus(workItem);
  }

  public GetPage(pageNumber: number) {
    const end = pageNumber * 10;
    const start = end - 10;
    const newRecords = this.workItemsGrid.workItems.slice(start, end);
  }

  showProfile() {
    jQuery('#ibox2').children('.ibox-content').toggleClass('sk-loading');
  }

  onFilterChanged(filter: any) {
    let workItemGridView: StatusGridView = new  StatusGridView();
    this.searchText = filter;
    debugger;
    if (this.searchText) {
      if (this.workItemsGrid != null) {
        this.workItemsGrid.workItems = this.originalworkItemsGrid.workItems.filter(item => item.workItemID === +filter || item.primaryClient.clientName.includes(filter) || item.primaryClient.registrationNo.includes(filter));
      }
    } else {
      this.workItemsGrid = this.originalworkItemsGrid;
    }

    if (filter === '') {
      this.workItemsGrid = this.originalworkItemsGrid;
    }
    this.SetgridPageResuls();
    this.currentGridPageResul = this.gridPageResuls[0];
  }

  SetgridPageResuls() {
    let i, j, page, k = 0;
    const chunk = 10;
    this.gridPageResuls = []
    for (i = 0, j = this.workItemsGrid.workItems.length; i < j; i += chunk) {
      page = this.workItemsGrid.workItems.slice(i, i + chunk);
      const gridPage = new GridPageResul<WorkItem>();
      gridPage.data = page;
      gridPage.pageNumber = ++k;
      if (k === 1) {
        gridPage.active = true;
      }
      this.gridPageResuls.push(gridPage);
    }
  }
  SetCurrentPage(pageGrid: GridPageResul<WorkItem>) {
    if (pageGrid) {
      for (let i = 0; i < this.gridPageResuls.length; i++) {
        this.gridPageResuls[i].active = false;
      }
      pageGrid.active = true;
      this.currentGridPageResul = pageGrid;
    }
  }

  setStatusReport() {
    for (let i = 0; i < 10; i++) {
      const record = new StatusRecord();
      const recordWorkItems = this.originalworkItemsGrid.workItems.filter(x => x.workItemStatusInfor.statusCode === i.toString());
      if (recordWorkItems && recordWorkItems.length > 0) {
        const first = recordWorkItems[0];
        record.numberOfRecords = recordWorkItems.length;
        record.description = first.workItemStatusInfor.status;
        record.statusID = first.workItemStatusInfor.statusID;
        const leng = this.originalworkItemsGrid.workItems.length;
        record.percentage = (record.numberOfRecords / leng) * 100;
        record.percentage = +record.percentage.toFixed(2);
        this.statusReport.statusRecord.push(record);
      }
    }
  }
  showSpinner() {
    jQuery('#ibox2').children('.ibox-content').toggleClass('sk-loading');
  }

  Next(page: StatusGridViewPage, tab: StatusGridView) {
    tab.currentPage = tab.statusGridViewPages[page.pageNumber];
  }
  Prev(page: StatusGridViewPage, tab: StatusGridView) {
    tab.currentPage = tab.statusGridViewPages[page.pageNumber - 2];
  }

  showProfileOnClick(item: WorkItem) {
    debugger;
    jQuery('#workItems').removeClass('col-lg-12');
    jQuery('#workItems').addClass('col-lg-7');
    jQuery('#profile').addClass('col-lg-5');
    jQuery('#content').addClass('jumbotron');
    jQuery('#profile').show();
    this.currentProfile = item;
  }

  hideProfileOnClick() {
    jQuery('#workItems').removeClass('col-lg-7');
    jQuery('#workItems').addClass('col-lg-12');
    jQuery('#profile').removeClass('col-lg-5');
    jQuery('#profile').hide();
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

  public GetDocumentStatusCSS(statusID: number) {
    switch (statusID) {
      case 0:
        return 'btn btn-warning btn-xs pull-right';
      case 1:
        return 'btn btn-info btn-xs pull-right';
      case 2:
        return 'btn btn-success btn-xs pull-right';
      case 3:
        return 'btn btn-danger btn-xs pull-right';
    }
  }

  clientReview() {
    localStorage.setItem('workItem', JSON.stringify(this.currentProfile));
    this.router.navigate(['review']);
  }

  updatedCSSClass(item: WorkItem) {
    if (!item.isChecked) {
      return 'updated';
    }
    return '';
  }

}
