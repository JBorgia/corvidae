import { Injectable } from '@angular/core';

@Injectable()
export class RefactorService {

  constructor(
  ) { }

  // Do not delete. This is for the renaming of keys. It recursively searches through an object replacing all oldKey keys with newKey keys.
  replaceKey(obj, oldKey, newKey) {
    if (Array.isArray(obj)) {
      return obj.map(arrObj => this.replaceKey(arrObj, oldKey, newKey));
    } else {
      let value;

      for (let key in obj) {
        if (key) {
          // Get the value
          value = obj[key];

          // If this is an object, recurse
          if (typeof value === 'object' || Array.isArray(value)) {
            value = this.replaceKey(value, oldKey, newKey);
          }
          if (key === oldKey) {
            obj[newKey] = value;
            delete obj[oldKey];
          }
        }
      }
      return obj;
    }
  }

}
