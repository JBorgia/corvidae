import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserPreferences } from '@models/user-preferences';
import { UserProfile } from '@models/user-profile';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay, tap, timeout } from 'rxjs/operators';

import { RefactorService } from './refactor.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  })
};

@Injectable()
export class UserService {
  user: UserProfile;
  userServiceStatus$ = new BehaviorSubject('loading');
  userThemes = {
    'Dark Theme': 'dark-theme',
    'Light Theme': 'light-theme',
  };
  userTypes = {
    Default: null,
    Tech: 'TECH',
    Manager: 'TECH_SUPER',
  };

  userPrefs$ = new BehaviorSubject(new UserPreferences());

  constructor(
    private http: HttpClient,
    private refactorService: RefactorService,
  ) { }

  get isComcast() {
    return this.user ? this.user.partnerId === 'comcast' : false;
  }

  getUserProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>('/web-app-svc/tech/profile')
      .pipe(
        tap(user => {
          if (user) {
            this.user = user;
          }
        }),
        shareReplay(),
        timeout(60000),
        catchError(err => {
          if (err.status !== 403 && err.status !== 401) {
            this.userServiceStatus$.next('broken');
          }
          throw err;
        })
      );
  }

  getUserProfileList(users): Observable<UserProfile[]> {
    return this.http.post<UserProfile[]>('/web-app-svc/tech/profileByUserList', users, httpOptions).pipe(
      catchError(error => {
        return throwError('Error Label', error);
      })
    );
  }

  addUserProfileList(users, results): Observable<any[]> {
    return this.http.post<any[]>('/web-app-svc/tech/profileByUserList', users, httpOptions)
      .pipe(
        map(profiles => {
          for (const profile of profiles) {
            for (const stats of results) {
              if (profile.username === stats.username) {
                profile['stats'] = stats;
              }
            }
          }
          return profiles;
        })
      );
  }

  fetchProfilePreferences(): Observable<UserPreferences> {
    const obs = this.http.get<UserPreferences>('/web-app-svc/tech/profilePreferencesByUser')
      .pipe(
        map(prefs => {
          // This is a temporary solution in case users still have home set as their default homepage in the database
          if (prefs.defaultHomepage === 'home' || prefs.defaultHomepage === 'dashboard') {
            prefs.defaultHomepage = 'release-notes';
            this.http.put<string>('/web-app-svc/tech/profilePreferencesByUser', prefs).subscribe();
          }
          return prefs;
        }),
        shareReplay()
      );
    obs.subscribe(prefs => {
      this.userPrefs$.next(prefs);
      if (!prefs.theme) {
        prefs.theme = 'light-theme';
      }
    });
    return obs;
  }

  saveProfilePreferences(): void {
    this.http.put<string>('/web-app-svc/tech/profilePreferencesByUser', this.userPrefs$.value, httpOptions)
      .pipe(
        map(res => JSON.parse(res))
      ).subscribe();
  }

  saveTheme(theme): void {
    const newPrefs = this.userPrefs$.value;
    newPrefs.theme = theme;
    this.http.put<string>('/web-app-svc/tech/profilePreferencesByUser', newPrefs, httpOptions)
      .pipe(
        map(res => JSON.parse(res))
      ).subscribe(prefs => {
        this.userPrefs$.next(prefs);
      });
  }

  getUserProfileByUsername(username: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(`/web-app-svc/tech/profile/${username}`);
  }

  uploadProfileImage(userImg: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', userImg, userImg.name);
    return this.http.post('/web-app-svc/tech/profileImage', formData, {});
  }

  updateUserTypePartnerId(userType, partnerId?) {
    return this.http.put<any>(
      `/web-app-svc/tech/updateUserType?type=${userType}&partnerid=${partnerId}`
      , httpOptions);
  }

  getBrand() {
    if (this.user.partnerId === 'comcast') {
      return 'XM';
    } else {
      return 'XMeter';
    }
  }

  /**
   * Get nt user name from query parameter
   * If no user name is provided in a query parameter, default to the user logged into the app
   * @returns string value containing nt user name
   */
  getTargetUser(targetProfile: UserProfile, params: any): string {
    if (params.username) {
      return params.username;
    } else {
      return targetProfile.username;
    }
  }
}




