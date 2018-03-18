import { Component, OnDestroy, OnInit, } from '@angular/core';

@Component({
  selector: 'submitted',
  templateUrl: 'submitted.component.html'
})
export class SubmittedComponent implements OnDestroy, OnInit  {

public nav:any;

public constructor() {
  this.nav = document.querySelector('nav.navbar');
}

public ngOnInit():any {
  this.nav.className += " white-bg";
}


public ngOnDestroy():any {
  this.nav.classList.remove("white-bg");
}

}
