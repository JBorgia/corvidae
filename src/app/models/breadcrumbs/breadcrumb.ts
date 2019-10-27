import {BreadcrumbRoute} from '@models/breadcrumbs/breadcrumb-route';

export class Breadcrumb {
  constructor(
    title = '',
    breadcrumbRoute = new BreadcrumbRoute()
  ) {
    this.title = title;
    this.breadcrumbRoute = breadcrumbRoute;
  }

  title: string;
  breadcrumbRoute: BreadcrumbRoute;
}
