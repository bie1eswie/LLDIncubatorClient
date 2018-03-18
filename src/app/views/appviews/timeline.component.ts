import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Registration } from '../account/registration';
import { OperationResult } from '../../utilities/operationResult';
import { MembershipService } from '../../services/membership.service';
import { NotificationService } from '../../services/notification.service';
import { WorkItemGridView } from '../../requirements/workItemGrid';

@Component({
  selector: 'timeline',
  templateUrl: 'timeline.component.html'
})

export class TimelineComponent implements OnInit {

  public workItemsGrid: WorkItemGridView;

      ngOnInit() {
        this.workItemsGrid = new  WorkItemGridView();
    }
}
