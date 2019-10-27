import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointService } from '@services/breakpoint.service';
import { Subscription } from 'rxjs';

import { BreadcrumbService } from '../full/header/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit, OnDestroy {
  toggleGame = false;
  show = false;
  subs: Subscription[] = [];

  constructor(
    private breakpointService: BreakpointService,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
  ) { }

  @HostListener('window:keydown', ['$event'])
  spaceEvent(event: any) {
    if (event.keyCode === 32) {
      this.toggleSnake();
    }
  }

  ngOnInit() {
    this.subs.push(
      this.breadcrumbService.lastNavEnd.subscribe(lastNavEnd => {
        if (lastNavEnd && lastNavEnd.url !== lastNavEnd.urlAfterRedirects) {
          // this.errorHandlerService.handleError(
          //   new Error(`404: '${lastNavEnd.url}' does not exist.`)
          // );
        }
      })
    );
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  toggleSnake() {
    if (!this.breakpointService.isMaxWidthMd) {
      this.show = true;
      setTimeout(() => {
        this.toggleGame = true;
      }, 1000);
    } else {
      this.router.navigate(['home']);
    }
  }

}
