import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule} from "@angular/router";
import { Location, LocationStrategy, HashLocationStrategy } from '@angular/common';

import {ROUTES} from "./app.routes";
import { AppComponent } from './app.component';

// App views
import {DashboardsModule} from "./views/dashboards/dashboards.module";
import {AppviewsModule} from "./views/appviews/appviews.module";

// App modules/components
import {LayoutsModule} from "./components/common/layouts/layouts.module";

//services
import { DataService } from './services/data.service';
import { MembershipService } from './services/membership.service';
import { UtilityService } from './services/utility.service';
import { NotificationService } from './services/notification.service';
import { RequiremntService } from './services/requirements.service';
import { UserListService } from './services/userList.service';
import { TimelineService } from './services/timeline.service';
import { IboxtoolsModule } from './components/common/iboxtools/iboxtools.module';
import { DocumentService } from './services/document.service';
import { IncubationService } from './services/incubation.service';
import { TabsModule } from 'ngx-bootstrap/tabs/tabs.module';
import { Tabset } from './utilities/tabset.component';
import { Tab } from './utilities/tab.directive';
import { TabHeading } from './utilities/tab-heading.directive';
import { NgTransclude } from './utilities/utils';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DashboardsModule,
    LayoutsModule,
    AppviewsModule,
    IboxtoolsModule,
    CommonModule,
   // SharedModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [DataService, MembershipService, UtilityService, NotificationService,
              RequiremntService, UserListService, TimelineService, DocumentService,
              IncubationService,
              {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
