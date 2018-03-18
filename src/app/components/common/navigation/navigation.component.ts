import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import 'jquery-slimscroll';
import { User } from '../../../views/account/user';
import { Registration } from '../../../views/account/registration';

declare var jQuery:any;

@Component({
  selector: 'navigation',
  templateUrl: 'navigation.template.html'
})

export class NavigationComponent implements OnInit {

  public user: Registration;
  constructor(private router: Router) {}

  ngAfterViewInit() {
    jQuery('#side-menu').metisMenu();

    if (jQuery("body").hasClass('fixed-sidebar')) {
      jQuery('.sidebar-collapse').slimscroll({
        height: '100%'
      })
    }
  }

    ngOnInit() {
    const user: Registration = JSON.parse(localStorage.getItem('user'));
    this.user = user;
    this.user.role = user.userRoleViews[0].roleID;
    debugger;
  }

  activeRoute(routename: string): boolean{
    return this.router.url.indexOf(routename) > -1;
  }


}
