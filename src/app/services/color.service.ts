import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay, startWith } from 'rxjs/operators';

import { UserService } from './user.service';

const COLORVARS = [
  '--channel-maps-video',
  '--channel-maps-analog',
  '--channel-maps-vod',
  '--channel-maps-docsis',
  '--channel-maps-ofdm',
  '--channel-maps-other',
  '--channel-maps-default',
  '--graph-label-primary',
  '--graph-line-theme',
  '--graph-grid-line-primary',
  '--graph-grid-line-secondary'
];

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  colors: { [key: string]: string };
  colors$: Observable<{ [key: string]: string }>;
  theme$: BehaviorSubject<string>;
  renderer: Renderer2;

  constructor(
    private userService: UserService,
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.mapColorsOnThemeChanges();
  }

  setThemeColors(themeName) {
    this.colors = COLORVARS.reduce((colors, cssVariable: string) => {
      colors[cssVariable] = this.getComputedValue(cssVariable);
      return colors;
    }, {});

    this.publishNewTheme(themeName);
  }

  publishNewTheme(themeName) {
    if (!this.theme$) {
      this.theme$ = new BehaviorSubject(themeName);
    } else {
      this.theme$.next(themeName);
    }
  }

  private mapColorsOnThemeChanges() {
    this.colors$ = this.userService.userPrefs$.pipe(
      startWith(this.userService.userPrefs$.value),
      map(userPrefs => {
        this.renderer.setAttribute(document.body, 'data-theme', userPrefs.theme);
        this.colors = COLORVARS.reduce((colorVars, colorVar) => {
          colorVars[colorVar] = this.getComputedValue(colorVar);
          return colorVars;
        }, {});
        return this.colors;
      }),
      shareReplay()
    );
  }

  getComputedValue(cssVariable): string {
    return window.getComputedStyle(document.body).getPropertyValue(cssVariable);
  }

}
