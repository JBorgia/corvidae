import { Injectable } from '@angular/core';
import {Logger} from '@services/logging.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
  ) { }

  reAuthOnError(err) {
    if (err.status === 401 || err.status === 403) {

      Logger.debug('reAuthOnError()');

      let redirectURL = '/auth-svc/sso/web';

      // case for development on localhost
      if ('http://localhost:4200' === window.location.origin) {
        Logger.debug('localhost:4200');
        redirectURL = `/auth-svc/sso/devweb`;
      }

      // case for development on localhost
      if ('http://xm-localhost.optek.comcast.net:9200' === window.location.origin) {
        redirectURL = `/auth-svc/sso/devbstack`;
      }

      Logger.debug('redirectUrl A:', redirectURL);

      const afterHash = window.location.hash;
      const params = afterHash.split('&');

      params.forEach(function (param) {
        const paramKV = param.split('=');
        if (paramKV[0] === 'id_token' || paramKV[0] === '#id_token') {
          const token = paramKV[1];
          redirectURL = `${window.location.origin}/auth-svc/login?token=${token}`;
        }
      });

      if (window.location.href.indexOf('/login') === -1 && !localStorage.getItem('appRoute')) {
        // set the current route in local storage so we can reload the same route on redirect form SSO
        let currentRoute = window.location.hash;
        localStorage.setItem('appRoute', `${currentRoute}`);
      }

      Logger.debug('redirectUrl B:', redirectURL);
      window.location.href = redirectURL;
    }
  }
}
