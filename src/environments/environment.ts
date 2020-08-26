// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  stripe: {
    publicKey:
      'pk_test_51HFAJnEM1ZTRJUunMG2SHfDgpSVjRfDwUBzhZZAb8UgfnBUffI6TILmi8lWmLdOTFI0pblEeP7c5KUGXafzmdI7h00QgXo8DZN',
  },
  algolia: {
    appId: 'BQ4M4PM81E',
    searchKey: 'bcf9c772491ea74ff8a8411bfeb182f4',
  },
  firebase: {
    apiKey: 'AIzaSyANR8AypGILHWh4GjLMk0WkpNEukLpn0-8',
    authDomain: 'my-app-7e83d.firebaseapp.com',
    databaseURL: 'https://my-app-7e83d.firebaseio.com',
    projectId: 'my-app-7e83d',
    storageBucket: 'my-app-7e83d.appspot.com',
    messagingSenderId: '512439211847',
    appId: '1:512439211847:web:e053c145dae6f08a885e62',
    measurementId: 'G-LTC164CZRL',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
