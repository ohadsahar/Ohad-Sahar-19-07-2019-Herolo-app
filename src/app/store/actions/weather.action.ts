import { Action } from '@ngrx/store';
export const GET_AUTO_COMPLETE_CITIES = 'GET_AUTO_COMPLETE_CITIES';
export const GET_AUTO_COMPLETE_CITIES_SUCCESS = 'GET_AUTO_COMPLETE_CITIES_SUCCESS';
export const GET_AUTO_COMPLETE_CITIES_FAILED = 'GET_AUTO_COMPLETE_CITIES_FAILED';
export const GET_CURRENT_WEATHER = 'GET_CURRENT_WEATHER';
export const GET_CURRENT_WEATHER_SUCCESS = 'GET_CURRENT_WEATHER_SUCCESS';
export const GET_CURRENT_WEATHER_FAILED = 'GET_CURRENT_WEATHER_FAILED';
export const GET_FIVE_DAY_WEATHER = 'GET_FIVE_DAY_WEATHER';
export const GET_FIVE_DAY_WEATHER_SUCCESS = 'GET_FIVE_DAY_WEATHER_SUCCESS';
export const GET_FIVE_DAY_WEATHER_FAILED = 'GET_FIVE_DAY_WEATHER_FAILED';
export const GET_GEOLOCATION_WEATHER = 'GET_GEOLOCATION_WEATHER';
export const GET_GEOLOCATION_WEATHER_SUCCESS = 'GET_GEOLOCATION_WEATHER_SUCCESS';
export const GET_GEOLOCATION_WEATHER_FAILED = 'GET_GEOLOCATION_WEATHER_FAILED';

export class GetAutoCompleteCities implements Action {
  readonly type = GET_AUTO_COMPLETE_CITIES;
  constructor(public payload: string) {
  }
}

export class GetAutoCompleteCitiesSuccess implements Action {
  readonly type = GET_AUTO_COMPLETE_CITIES_SUCCESS;
  constructor(public payload: any) { }
}

export class GetAutoCompleteCitiesFailed implements Action {
  readonly type = GET_AUTO_COMPLETE_CITIES_FAILED;
  constructor(public payload: any) {
  }
}

export class GetCurrentWeather implements Action {
  readonly type = GET_CURRENT_WEATHER;
  constructor(public payload: number) { }
}

export class GetCurrentWeatherSuccess implements Action {
  readonly type = GET_CURRENT_WEATHER_SUCCESS;
  constructor(public payload: any) { }
}

export class GetCurrentWeatherFailed implements Action {
  readonly type = GET_CURRENT_WEATHER_FAILED;
  constructor(public payload: any) { }
}

export class GetFiveDayWeather implements Action {
  readonly type = GET_FIVE_DAY_WEATHER;
  constructor(public payload: any, public metric: boolean) { }
}

export class GetFiveDayWeatherSuccess implements Action {
  readonly type = GET_FIVE_DAY_WEATHER_SUCCESS;
  constructor(public payload: any) { }
}

export class GetFiveDayWeatherFailed implements Action {
  readonly type = GET_FIVE_DAY_WEATHER_FAILED;
  constructor(public payload: any) { }
}

export class GetGeoLocation implements Action {
  readonly type = GET_GEOLOCATION_WEATHER;
  constructor(public payload: any) { }
}

export class GetGeoLocationSuccess implements Action {
  readonly type = GET_GEOLOCATION_WEATHER_SUCCESS;
  constructor(public payload: any) { }
}

export class GetGeoLocationFailed implements Action {
  readonly type = GET_GEOLOCATION_WEATHER_FAILED;
  constructor(public payload: any) { }
}

export type WeatherActions = GetAutoCompleteCities | GetAutoCompleteCitiesSuccess | GetAutoCompleteCitiesFailed |
  GetCurrentWeather | GetCurrentWeatherSuccess | GetCurrentWeatherFailed | GetFiveDayWeather | GetFiveDayWeatherSuccess
  | GetFiveDayWeatherFailed | GetGeoLocation | GetGeoLocationSuccess | GetGeoLocationFailed;



