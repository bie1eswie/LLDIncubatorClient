import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {FormGroup, FormControl, FormBuilder,ReactiveFormsModule  } from '@angular/forms';

import {StarterViewComponent} from "./starterview.component";
import {LoginComponent} from "./login.component";
import {SignUpComponent} from "./signup.component";
import {ClientRequirements} from "./clientRequirements.component";
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {PeityModule } from '../../components/charts/peity';
import {SparklineModule } from '../../components/charts/sparkline';
import { DataService } from '../../services/data.service';
import { MembershipService } from '../../services/membership.service';
import { UtilityService } from '../../services/utility.service';
import { NotificationService } from '../../services/notification.service';
import { FieldSetGroupComponent } from './fieldSetGroup.component';
import { Collapse } from '../../utilities/collapsible.directive';
import { UserListComponent } from './userList.component';
import { TimelineComponent } from './timeline.component';
import { TimelineService } from '../../services/timeline.service';
import { IboxtoolsModule } from '../../components/common/iboxtools/iboxtools.module';
import { SubmittedComponent } from './submitted.component';
import { IncubationRequirementComponent } from './incubation/incubation.component';
import { QuardrantComponent } from './incubation/quardrant.component';
import { ForgotPasswordComponent } from './forgotPassword';
import { ConfirmAccount } from '../account/confirmAccount';
import { ConfirmRegistrationComponent } from "app/views/appviews/confirmRegistration";
import {CalendarComponent} from 'ap-angular2-fullcalendar';
import { RegistrationNotificationComponent } from './registrationNotification';
import { ClientReviewComponent } from './clientReview';
import { InterventionReportComponent } from "app/views/appviews/incubation/interventionReport/interventionReport.component";
import { MyFilterPipe } from '../../utilities/search/filterItems';
import { Tab } from '../../utilities/tab.directive';
import { Tabset } from '../../utilities/tabset.component';
import { TabHeading } from '../../utilities/tab-heading.directive';
import { NgTransclude } from '../../utilities/utils';

@NgModule({
  declarations: [
    StarterViewComponent,
    LoginComponent,
    SignUpComponent,
    ClientRequirements,
    UserListComponent,
    FieldSetGroupComponent,
    Collapse,
    TimelineComponent,
    SubmittedComponent,
    IncubationRequirementComponent,
    QuardrantComponent,
    ForgotPasswordComponent,
    ConfirmRegistrationComponent,
    RegistrationNotificationComponent,
    ClientReviewComponent,
    InterventionReportComponent,
    MyFilterPipe,
    Tab,
    Tabset,
    TabHeading,
    NgTransclude
  ],
  imports: [
    BrowserModule,
    RouterModule,
    PeityModule,
    SparklineModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    IboxtoolsModule
    //DatePickerModule
  ],
  exports: [
    StarterViewComponent,
    LoginComponent,
    SignUpComponent,
    ClientRequirements,
    UserListComponent,
    TimelineComponent,
    FieldSetGroupComponent,
    Collapse,
    FormsModule,
    ReactiveFormsModule,
    SubmittedComponent,
    IncubationRequirementComponent,
    QuardrantComponent,
    ForgotPasswordComponent,
    ConfirmRegistrationComponent,
    RegistrationNotificationComponent,
    ClientReviewComponent,
    Tab,
    Tabset,
    TabHeading,
    NgTransclude
  ],
})

export class AppviewsModule {
}
