import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AuthInterceptorService } from '@services/auth-interceptor.service';
import { RefactorService } from '@services/refactor.service';
import { UserService } from '@services/user.service';

import { AppRoutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapModule } from './common/map/map.module';
import { FullModule } from './pages/full/full.module';
import { NotFoundModule } from './pages/not-found/not-found.module';
import { BreakpointService } from './services/breakpoint.service';
import { ThemeService } from './services/theme.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    FullModule,
    MapModule,
    HttpClientModule,
    NotFoundModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true,
      onSameUrlNavigation: 'reload',
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    }),
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    UserService,
    ThemeService,
    BreakpointService,
    RefactorService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      multi: true,
      deps: [ThemeService, Injector]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function initApp(themeService: ThemeService, injector: Injector) {
  return () => {
    return new Promise((resolve) => {
      themeService.setThemeFromLocalStorage();
      resolve();
    });
  };
}
