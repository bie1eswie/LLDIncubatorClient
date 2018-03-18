import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';
import { Registration } from '../../account/registration';
import { OperationResult } from '../../../utilities/operationResult';
import { MembershipService } from '../../../services/membership.service';
import { RequiremntService } from '../../../services/requirements.service';
import { Client } from '../../../workItem/client';
import { WorkItem } from '../../../workItem/workItem';
import { WorkItemRequirements } from '../../../requirements/workItemRequirement';
import { WorkItemField } from '../../../requirements/field';
import { NotificationService } from '../../../services/notification.service';
import { WorkItemStatusInfor } from '../../../workItem/workItemStatusInfor';
import { StarterViewComponent } from '../starterview.component';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { WorkItemStage } from '../../../requirements/workItemStage';
import { saveAs } from 'file-saver';
import { WorkItemDocument } from '../../../requirements/workIremDocument';
import {Response} from '@angular/http';
import { User } from '../../account/user';
import { CommonLists } from '../../../utilities/sefate.constants.Lists';
import { StageUpdateView } from '../../../requirements/stageUpdate';
import { DocumentService } from '../../../services/document.service';
import { IncubationService } from '../../../services/incubation.service';
import { IncubatorRequirement } from '../../../requirements/incubation/incubatorRequirement';
import { IncubatorQuardrant } from '../../../requirements/incubation/incubatorQuardrant';
import { FlotChartDirective } from '../../../components/charts/flotChart';

declare var jQuery: any;

@Component({
  selector: 'incubationRequirements',
  templateUrl: 'incubation.component.html'
})
export class IncubationRequirementComponent implements OnDestroy, OnInit  {

   public incubatorRequirement: IncubatorRequirement;
   private workItem: WorkItem;
   public errorMessage: String;
   public user: Registration;
   public nav: any;
   public todos: any;

    constructor(public router: Router, public requirementService: IncubationService,
                public notificationService: NotificationService, public documentService: DocumentService,
                private route: ActivatedRoute, private builder: FormBuilder) {

                this.nav = document.querySelector('nav.navbar');
                this.todos = [
                  {name: "Buy a milk", completed: true},
                  {name: "Go to shop and find some products.", completed: false},
                  {name: "Send documents to Mike ", completed: false, time: 1},
                  {name: "Go to the doctor dr Smith", completed: false},
                  {name: "Plan vacation", completed: true},
                  {name: "Create new stuff", completed: false},
                  {name: "Call to Anna for dinner", completed: false},
                ];
    }
    ngOnInit() {
      this.nav.className += " white-bg";
      this.incubatorRequirement = new IncubatorRequirement();
      this.GetWorkItemRequirements();
    }

  public ngOnDestroy():any {
    this.nav.classList.remove("white-bg");
  }

  // Flot chart data and options

  private gd(year, month, day) {
    return new Date(year, month - 1, day).getTime();
  }



  private data1 = [
    [this.gd(2012, 1, 1), 7], [this.gd(2012, 1, 2), 6], [this.gd(2012, 1, 3), 4], [this.gd(2012, 1, 4), 8],
    [this.gd(2012, 1, 5), 9], [this.gd(2012, 1, 6), 7], [this.gd(2012, 1, 7), 5], [this.gd(2012, 1, 8), 4],
    [this.gd(2012, 1, 9), 7], [this.gd(2012, 1, 10), 8], [this.gd(2012, 1, 11), 9], [this.gd(2012, 1, 12), 6],
    [this.gd(2012, 1, 13), 4], [this.gd(2012, 1, 14), 5], [this.gd(2012, 1, 15), 11], [this.gd(2012, 1, 16), 8],
    [this.gd(2012, 1, 17), 8], [this.gd(2012, 1, 18), 11], [this.gd(2012, 1, 19), 11], [this.gd(2012, 1, 20), 6],
    [this.gd(2012, 1, 21), 6], [this.gd(2012, 1, 22), 8], [this.gd(2012, 1, 23), 11], [this.gd(2012, 1, 24), 13],
    [this.gd(2012, 1, 25), 7], [this.gd(2012, 1, 26), 9], [this.gd(2012, 1, 27), 9], [this.gd(2012, 1, 28), 8],
    [this.gd(2012, 1, 29), 5], [this.gd(2012, 1, 30), 8], [this.gd(2012, 1, 31), 25]
  ];

  private data2 = [
    [this.gd(2012, 1, 1), 800], [this.gd(2012, 1, 2), 500], [this.gd(2012, 1, 3), 600], [this.gd(2012, 1, 4), 700],
    [this.gd(2012, 1, 5), 500], [this.gd(2012, 1, 6), 456], [this.gd(2012, 1, 7), 800], [this.gd(2012, 1, 8), 589],
    [this.gd(2012, 1, 9), 467], [this.gd(2012, 1, 10), 876], [this.gd(2012, 1, 11), 689], [this.gd(2012, 1, 12), 700],
    [this.gd(2012, 1, 13), 500], [this.gd(2012, 1, 14), 600], [this.gd(2012, 1, 15), 700], [this.gd(2012, 1, 16), 786],
    [this.gd(2012, 1, 17), 345], [this.gd(2012, 1, 18), 888], [this.gd(2012, 1, 19), 888], [this.gd(2012, 1, 20), 888],
    [this.gd(2012, 1, 21), 987], [this.gd(2012, 1, 22), 444], [this.gd(2012, 1, 23), 999], [this.gd(2012, 1, 24), 567],
    [this.gd(2012, 1, 25), 786], [this.gd(2012, 1, 26), 666], [this.gd(2012, 1, 27), 888], [this.gd(2012, 1, 28), 900],
    [this.gd(2012, 1, 29), 178], [this.gd(2012, 1, 30), 555], [this.gd(2012, 1, 31), 993]
  ];


  public flotDataset:any = [
    {
      label: "Number of orders",
      data: this.data2,
      color: "#1ab394",
      bars: {
        show: true,
        align: "center",
        barWidth: 24 * 60 * 60 * 600,
        lineWidth: 0
      }

    }, {
      label: "Payments",
      data: this.data1,
      yaxis: 2,
      color: "#1C84C6",
      lines: {
        lineWidth: 1,
        show: true,
        fill: true,
        fillColor: {
          colors: [{
            opacity: 0.2
          }, {
            opacity: 0.4
          }]
        }
      },
      splines: {
        show: false,
        tension: 0.6,
        lineWidth: 1,
        fill: 0.1
      },
    }
  ];

  public flotOptions:any =
  {
    xaxis: {
      mode: "time",
      tickSize: [3, "day"],
      tickLength: 0,
      axisLabel: "Date",
      axisLabelUseCanvas: true,
      axisLabelFontSizePixels: 12,
      axisLabelFontFamily: 'Arial',
      axisLabelPadding: 10,
      color: "#d5d5d5"
    },
    yaxes: [{
      position: "left",
      max: 1070,
      color: "#d5d5d5",
      axisLabelUseCanvas: true,
      axisLabelFontSizePixels: 12,
      axisLabelFontFamily: 'Arial',
      axisLabelPadding: 3
    }, {
      position: "right",
      clolor: "#d5d5d5",
      axisLabelUseCanvas: true,
      axisLabelFontSizePixels: 12,
      axisLabelFontFamily: ' Arial',
      axisLabelPadding: 67
    }
    ],
    legend: {
      noColumns: 1,
      labelBoxBorderColor: "#000000",
      position: "nw"
    },
    grid: {
      hoverable: false,
      borderWidth: 0
    }
  };

  // jVector Map options

  public mapOptions:any = {
    map: 'world_mill_en',
    backgroundColor: "transparent",
    regionStyle: {
      initial: {
        fill: '#e4e4e4',
        "fill-opacity": 0.9,
        stroke: 'none',
        "stroke-width": 0,
        "stroke-opacity": 0
      }
    },
    series: {
      regions: [{
        values: {
          "US": 298,
          "SA": 200,
          "DE": 220,
          "FR": 540,
          "CN": 120,
          "AU": 760,
          "BR": 550,
          "IN": 200,
          "GB": 120
        },
        scale: ["#1ab394", "#22d6b1"],
        normalizeFunction: 'polynomial'
      }]
    },
  }

    GetWorkItemRequirements(): void {
        this.requirementService.requirement(this.workItem)
            .subscribe((res: any) => {
                this.incubatorRequirement.incubatorQuardrants = res.requirementsTabs;
            });
    };
  LoadQuardrant(quardrant: IncubatorQuardrant): void {
      if (quardrant) {
        localStorage.setItem('quardrant', JSON.stringify(quardrant));
        this.router.navigate(['incubatorquardrant']);
      }
  }
}
