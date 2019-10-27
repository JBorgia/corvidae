export class BreadcrumbRoute {
  url: string;
  queryParams: { [key: string]: string };

  constructor(url = '', queryParams = {}) {
    this.url = url;
    this.queryParams = queryParams;
  }
}
