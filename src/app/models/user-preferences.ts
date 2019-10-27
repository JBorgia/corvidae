import {UserThemes} from '@models/user-themes';

export class UserPreferences {
  // default?: boolean;
  showMinisidebar: boolean;
  defaultHomepage: string;
  theme: string;

  constructor() {
    // set default values
    this.showMinisidebar = false;
    this.defaultHomepage = 'release-notes';
    this.theme = 'light-theme';
  }

}
