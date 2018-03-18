
import {Directive, OnInit, OnDestroy, DoCheck,Input, Output, HostListener, HostBinding,TemplateRef, EventEmitter} from '@angular/core';
import { NgClass } from '@angular/common';
import { NgTransclude, IAttribute } from './utils';
import {Tabset} from './tabset.component';

@Directive({selector: 'tab, [tab]'})
export class Tab implements OnDestroy {
    @Input() public heading: string;
    @Input() public disabled: boolean;
    @Input() public removable: boolean;

    @HostBinding('class.active')
    @Input() public get active() {
        return this._active;
    }

    @HostBinding('class.bg-success')
    @Input() public get activeClass() {
        return this._activeClass;
    }

    @Output() public select: EventEmitter<Tab> = new EventEmitter();
    @Output() public deselect: EventEmitter<Tab> = new EventEmitter();
    @Output() public removed: EventEmitter<Tab> = new EventEmitter();

    public set active(active) {
        if (this.disabled && active || !active) {
            if (!active) {
                this._active = active;
            }

            this.deselect.emit(this);
            return;
        }

        this._active = active;
        this.select.emit(this);
        this.tabset.tabs.forEach((tab:Tab) => {
            if (tab !== this) {
                tab.active = false;
            }
        });
    }

    public set activeClass(activeClass) {
      if (this.disabled && activeClass || activeClass !== undefined) {
          if (!activeClass) {
              this._activeClass = activeClass;
          }

          this.deselect.emit(this);
          return;
      }

      this._activeClass = activeClass;
      this.select.emit(this);
      this.tabset.tabs.forEach((tab: Tab) => {
          if (tab !== this) {
              tab.activeClass = '';
          }
      });
  }

    @HostBinding('class.tab-pane') private addClass = true;

    private _active: boolean;
    public headingRef: TemplateRef<any>;
    private _activeClass: string;

    constructor(public tabset: Tabset) {
        this.tabset.addTab(this);
    }

    ngOnInit() {
        this.removable = !!this.removable;
    }

    ngOnDestroy() {
        this.tabset.removeTab(this);
    }
}
