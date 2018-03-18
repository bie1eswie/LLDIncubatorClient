import { Routes } from "@angular/router";

import { Dashboard2Component } from "./views/dashboards/dashboard2.component";

import { StarterViewComponent } from "./views/appviews/starterview.component";
import { LoginComponent } from "./views/appviews/login.component";
import { SignUpComponent } from "./views/appviews/signup.component";
import { BlankLayoutComponent } from "./components/common/layouts/blankLayout.component";
import { BasicLayoutComponent } from "./components/common/layouts/basicLayout.component";
import { TopNavigationLayoutComponent } from "./components/common/layouts/topNavigationlayout.component";
import { ClientRequirements } from "./views/appviews/clientRequirements.component";
import { UserListComponent } from './views/appviews/userList.component';
import { QuardrantComponent } from './views/appviews/incubation/quardrant.component';
import { IncubationRequirementComponent } from './views/appviews/incubation/incubation.component';
import { SubmittedComponent } from './views/appviews/submitted.component';
import { ResetPassword } from './views/account/resetPassword';
import { ForgotPasswordComponent } from './views/appviews/forgotPassword';
import { ConfirmRegistrationComponent } from 'app/views/appviews/confirmRegistration';
import { RegistrationNotificationComponent } from './views/appviews/registrationNotification';
import { ClientReviewComponent } from './views/appviews/clientReview';
import { InterventionReportComponent } from './views/appviews/incubation/interventionReport/interventionReport.component';

export const ROUTES: Routes = [
  // Main redirect
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // App views
  {
    path: 'dashboards', component: BasicLayoutComponent,
    children: [
      { path: 'dashboard2', component: Dashboard2Component }
    ]
  },
  {
    path: '', component: BasicLayoutComponent,
    children: [
      { path: 'starterview', component: StarterViewComponent },
      { path: 'workItem', component: ClientRequirements },
      { path: 'useraccess', component: UserListComponent },
      { path: 'submitted', component: SubmittedComponent },
      { path: 'incubatorquardrant', component: QuardrantComponent },
      { path: 'incubation', component: IncubationRequirementComponent },
      { path: 'review', component: ClientReviewComponent },
      { path: 'bireport', component: InterventionReportComponent }
    ]
  },
  {
    path: '', component: BlankLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignUpComponent },
      { path: 'resetpassword', component: ForgotPasswordComponent },
      { path: 'confirmaccount', component: ConfirmRegistrationComponent },
      { path: 'registrationNotification', component: RegistrationNotificationComponent }
    ]
  },
];
