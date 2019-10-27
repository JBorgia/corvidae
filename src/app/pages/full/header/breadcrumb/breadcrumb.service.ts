import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Breadcrumb } from '@models/breadcrumbs/breadcrumb';
import { BreadcrumbConfig } from '@models/breadcrumbs/breadcrumb-config';
import { BreadcrumbElement } from '@models/breadcrumbs/breadcrumb-element';
import { BreadcrumbRoute } from '@models/breadcrumbs/breadcrumb-route';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { filter, map, mergeMap, tap } from 'rxjs/operators';

/**
 *
 * BreadcrumbConfigs are built of BreadcrumbElement objects. There are 4 types: url, param, queryParam and queryParams.
 * queryParam takes a single string of a queryParam to be referenced. queryParams takes an array of queryParams
 * to be referenced. There is some error catching.
 *
 * The breadcrumb of the breadcrumb can be set as a string or using a BreadcrumbElement.
 *


const ROUTES: Routes = [
  {
    path: 'user',
    data: {
      browserTabBreadcrumb: 'Meter Scans',
      breadcrumbs: [
        { breadcrumb: 'Dashboard', breadcrumbElements: [{ type: 'url', value: '/dashboard' }] },
      ]
    },
    component: MeterComponent
  }, {
    path: 'user/:username',
    data: {
      browserTabBreadcrumb: 'Meter Scans',
      breadcrumbs: [
        { breadcrumb: 'Dashboard', breadcrumbElements: [{ type: 'url', value: '/dashboard' }] },
        {
          breadcrumbElement: { type: 'param', value: 'username' },
          breadcrumbElements: [
            { type: 'url', value: '/meter-data' },
            { type: 'url', value: '/user' },
            { type: 'param', value: 'username' },
          ]
        },
      ]
    },
    component: MeterComponent
  }, {
    path: 'user/:username/:timestamp',
    data: {
      browserTabBreadcrumb: 'Meter Scans',
      breadcrumbs: [
        { breadcrumb: 'Dashboard', breadcrumbElements: [{ type: 'url', value: '/dashboard' }] },
        {
          breadcrumbElement: { type: 'param', value: 'username' },
          breadcrumbElements: [
            { type: 'url', value: '/meter-data' },
            { type: 'url', value: '/user' },
            { type: 'param', value: 'username' },
          ]
        },
        {
          breadcrumbElement: { type: 'param', value: 'timestamp' },
          breadcrumbElements: [
            { type: 'url', value: '/meter-data' },
            { type: 'url', value: '/user' },
            { type: 'param', value: 'username' },
            { type: 'param', value: 'timestamp' },
          ]
        },
      ]
    },
    component: MeterComponent
  }];


 */

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private hideBreadcrumb = true;
  lastNavEnd = new BehaviorSubject<NavigationEnd>(null);
  pageInfo;

  get isBreadcrumbHidden() {
    return this.hideBreadcrumb;
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private title: Title
  ) {
    this.trackRouteChanges();
  }

  trackRouteChanges() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      tap((navEnd: NavigationEnd) => this.lastNavEnd.next(navEnd)),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap((route: any) => {
        return combineLatest(route.data, route.params, route.queryParams);
      })).subscribe((event: any[]) => {
        this.generateBreadcrumbs(event);
      });
  }

  generateBreadcrumbs(event) {
    this.title.setTitle(event[0]['browserTabBreadcrumb']);
    this.pageInfo = this.mapParams(event[0]['breadcrumbs'], event[1], event[2]);
    this.pageInfo.breadcrumb = event[0]['browserTabBreadcrumb'];
  }

  mapParams(
    breadcrumbConfigs: BreadcrumbConfig[],
    params: { [key: string]: string },
    queryParams: { [key: string]: string }
  ): { breadcrumbs: Breadcrumb[] } {
    const breadcrumbs: Breadcrumb[] = [];
    breadcrumbConfigs.forEach((breadcrumbConfig: BreadcrumbConfig) => {
      const breadcrumb = new Breadcrumb();
      breadcrumb.breadcrumbRoute = this.generateRoute(breadcrumbConfig, params, queryParams);
      if (breadcrumbConfig.titleElement) {
        breadcrumb.title = this.generateBreadcrumb(breadcrumbConfig.titleElement, params, queryParams);
      } else if (breadcrumbConfig.title) {
        breadcrumb.title = breadcrumbConfig.title;
      }
      breadcrumbs.push(breadcrumb);
    });

    return { breadcrumbs };
  }

  generateRoute(
    breadcrumbConfig: BreadcrumbConfig,
    params: { [key: string]: string },
    queryParams: { [key: string]: string }
  ): BreadcrumbRoute {
    if (!breadcrumbConfig.breadcrumbElements && breadcrumbConfig.titleElement && breadcrumbConfig.titleElement.type === 'url') {
      return new BreadcrumbRoute(breadcrumbConfig.titleElement.value as string);
    }
    return breadcrumbConfig.breadcrumbElements.reduce((breadcrumbRoute: BreadcrumbRoute, breadcrumbItem: BreadcrumbElement) => {
      switch (breadcrumbItem.type) {
        case 'url':
          breadcrumbRoute.url += breadcrumbItem.value;
          break;
        case 'param':
          breadcrumbRoute.url += `/${params[breadcrumbItem.value as string]}`;
          break;
        case 'queryParam':
          breadcrumbRoute.queryParams[breadcrumbItem.value as string] = queryParams[breadcrumbItem.value as string];
          break;
        case 'queryParams':
          (breadcrumbItem.value as string[]).forEach(queryParam => {
            breadcrumbRoute.queryParams[queryParam] = queryParams[queryParam];
          });
          break;
      }
      return breadcrumbRoute;
    }, new BreadcrumbRoute());
  }

  // tslint:disable-next-line:max-line-length
  generateBreadcrumb(breadcrumbElement: BreadcrumbElement, params: { [key: string]: string }, queryParams: { [key: string]: string }): string {
    switch (breadcrumbElement.type) {
      case 'param':
        return this.toBreadcrumb(params[breadcrumbElement.value as string]);
      case 'queryParam':
        return queryParams[breadcrumbElement.value as string];
      case 'queryParams':
        return queryParams[breadcrumbElement.value[0]];
      default:
        return this.toBreadcrumb(breadcrumbElement.value as string);
    }
  }

  toBreadcrumb(text: string): string {
    const words = text.split(/[\/\-_]+/);
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ').trim();
  }

  toggleBreadcrumb(showHide?: 'show' | 'hide') {
    switch (showHide) {
      case 'show':
        this.hideBreadcrumb = false;
        break;
      case 'hide':
        this.hideBreadcrumb = true;
        break;
      default:
        this.hideBreadcrumb = !this.hideBreadcrumb;
    }
  }
}
