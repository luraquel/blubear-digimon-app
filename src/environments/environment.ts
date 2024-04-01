// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    projectId: 'blubear-pokemon',
    appId: '1:794339954662:web:586d671373766fe0635027',
    storageBucket: 'blubear-pokemon.appspot.com',
    apiKey: 'AIzaSyA6rl461y0uyvoyZRTduzVJQbarCej7p0Q',
    authDomain: 'blubear-pokemon.firebaseapp.com',
    messagingSenderId: '794339954662',
  },
  digimonUrl: 'https://digi-api.com/api/v1',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
