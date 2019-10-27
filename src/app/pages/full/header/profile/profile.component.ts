import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { XmDropdownComponent } from '@optek/xm-bootstrap';
import { Subscription } from 'rxjs';

import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  @ViewChild('profileMiniToggle', { static: true }) profileMiniToggle: XmDropdownComponent;


  user: any;
  userPrefs$ = this.userService.userPrefs$.getValue();
  userThemes = this.userService.userThemes;

  notificationHash = {};
  notificationTotal: number;
  notificationsActive: boolean;
  notificationsSub: Subscription;

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.user = this.userService.user;
  }

  saveUserThemeDropdown(theme) {
    this.userService.saveTheme(theme);
    this.profileMiniToggle.close();
    if (this.notificationsActive) {
      this.notificationStorage();
    }
  }

  getProfileImageStyle(value) {
    // return this.sharedFunctions.getProfileImageStyle(value);
  }

  /**
  * Sets notifications to localstorage if not already in existence | sets active notifications false
  * @returns no return
  */
  notificationStorage() {
    for (const notification of Object.entries(this.notificationHash)) {
      const notificationStorageId = notification[0];
      if (!localStorage.getItem(notificationStorageId)) {
        notification[1]['active'] = false;
        localStorage.setItem(notificationStorageId, notification[1]['message']);
      }
    }
    this.notificationsActive = false;
  }

  /**
  * Method called on mini profile toggle click event
  * @returns no return
  */
  xmDropdownChange() {
    if (!this.profileMiniToggle.isOpen()) {
      if (this.notificationsActive) {
        this.notificationStorage();
      }
    }
  }

  profileRoute() {
    this.router.navigate(['/profile']);
    this.profileMiniToggle.close();
  }

  ngOnDestroy() {
    this.notificationsSub.unsubscribe();
  }





  releaseNotesRoute() {
    this.router.navigate(['/release-notes']);
    this.profileMiniToggle.close();
  }
}
