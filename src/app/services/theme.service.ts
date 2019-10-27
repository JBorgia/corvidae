import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { ColorService } from '@services/color.service';
import { Logger } from '@services/logging.service';

export enum Themes {
  LIGHT = 'light-theme',
  DARK = 'dark-theme'
}

@Injectable()
export class ThemeService {

  public userThemes = {
    'light-theme': {
      name: 'Light Theme',
      active: false,
    },
    'dark-theme': {
      name: 'Dark Theme',
      active: false,
    },
  };
  private renderer: Renderer2;

  constructor(
    private rendererFactory: RendererFactory2,
    private colorService: ColorService
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    /**
     * set default theme (light-theme)
     */
    this.setActiveTheme(Themes.LIGHT);
  }

  setActiveTheme(themeName) {
    Logger.debug('setActiveTheme to ' + themeName);
    for (const [index, iterator] of Object.entries(this.userThemes)) {
      if (themeName === index) {
        iterator.active = true;
      } else {
        iterator.active = false;
      }
    }
    this.renderer.setAttribute(document.body, 'data-theme', themeName);
    this.colorService.setThemeColors(themeName);
  }

  setThemeFromLocalStorage() {
    Logger.info('setThemeFromLocalStorage()');
    Logger.warn('setThemeFromLocalStorage()');
    const LOCAL_NAME = 'theme';
    if (localStorage.getItem(LOCAL_NAME)) {
      const theme = localStorage.getItem(LOCAL_NAME);
      this.setActiveTheme(theme);
    }
  }

}

