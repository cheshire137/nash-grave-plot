const localStorageKey = 'nash-grave-plot';

class LocalStorage {
  static getJSON() {
    if (typeof window === 'undefined') {
      console.error("don't have a window to access local storage");
      return {};
    }
    if (!window.localStorage) {
      console.error('browser does not support local storage');
      return {};
    }
    const appData = window.localStorage.getItem(localStorageKey) || '{}';
    return JSON.parse(appData);
  }

  static get(key: string) {
    const appData = this.getJSON();
    return appData[key];
  }

  static set(key: string, value: any) {
    if (typeof window === 'undefined' || !window.localStorage) return;

    const appData = this.getJSON();
    appData[key] = value;
    window.localStorage.setItem(localStorageKey, JSON.stringify(appData));
  }

  static delete(key: string) {
    if (typeof window === 'undefined' || !window.localStorage) return;

    const appData = this.getJSON();
    delete appData[key];
    window.localStorage.setItem(localStorageKey, JSON.stringify(appData));
  }
}

export default LocalStorage;
