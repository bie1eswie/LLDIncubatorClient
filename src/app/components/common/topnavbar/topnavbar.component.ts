import { Component, OnInit } from '@angular/core';
import { smoothlyMenu } from '../../../app.helpers';
import { User } from '../../../views/account/user';
import { Router } from '@angular/router';
declare var jQuery:any;

@Component({
  selector: 'topnavbar',
  templateUrl: 'topnavbar.template.html'
})
export class TopNavbarComponent {

  public user: User;

  toggleNavigation(): void {
    jQuery("body").toggleClass("mini-navbar");
    smoothlyMenu();
  }
  constructor(public router: Router) {
  }

  ngOnInit() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.user = user;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
