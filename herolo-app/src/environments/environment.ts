// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  autoCompleteUrl: 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete',
  currentWeatherUrl: 'http://dataservice.accuweather.com/currentconditions/v1/',
  fiveDayWeatherUrl: 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/',
  geoLocationWeatherUrl: 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
