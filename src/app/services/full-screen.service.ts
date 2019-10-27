import { LocationStrategy } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable()
export class FullScreenService {
  // A boolean that coordinate classes when viewing full screen
  isFullScreen: boolean = false;

  constructor(location: LocationStrategy) {
    location.onPopState(() => {
      this.isFullScreen = false;
    });
  }

  toggleFullScreen(fullScreenEnabled: boolean) {
    this.isFullScreen = fullScreenEnabled;
  }

}
