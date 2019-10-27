import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AnalyticReport } from '@models/analytic-report';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private router: Router, private userService: UserService, private http: HttpClient) { }

  init(): void {
    this.onInitalLoad();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.sendAnalyticReport(this.buildAnalyticReport(event.url));
      }
    });
  }

  onInitalLoad() {
    this.sendAnalyticReport(this.buildAnalyticReport(window.location.href));
  }

  buildAnalyticReport(url: string) {
    const analyticReport = new AnalyticReport();
    analyticReport.uri = url;
    analyticReport.deviceType = window.navigator.userAgent;
    analyticReport.screenHeight = 0;
    analyticReport.screenWidth = 0;

    // Firefox does not support visualViewport
    if (window['visualViewport']) {
      analyticReport.screenHeight = window['visualViewport'].height;
      analyticReport.screenWidth = window['visualViewport'].width;
    } else {
      analyticReport.screenHeight = window.innerHeight;
      analyticReport.screenWidth = window.innerWidth;
    }

    analyticReport.timestamp = (new Date()).getTime();
    return analyticReport;
  }

  sendAnalyticReport(analyticReport: AnalyticReport) {
    const url = '/web-app-svc/log/analytics';
    this.http.post(url, analyticReport).subscribe();
  }
}


