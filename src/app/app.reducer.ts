import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as weatherReducer from './store/reducer/weather.reducer';
import * as fiveDayWeatherReducer from './store/reducer/five-day-weather.reducer';
import * as geoLocationWeatherReducer from './store/reducer/geolocation-weather.reducer';

export interface  State {
  weatherReducer: weatherReducer.State;
  fiveDayWeatherReducer: fiveDayWeatherReducer.State;
  geoLocationWeatherReducer: geoLocationWeatherReducer.State;
}
export const Reducers: ActionReducerMap<State> = {
  weatherReducer: weatherReducer.weatherReducer,
  fiveDayWeatherReducer: fiveDayWeatherReducer.fiveDayWeatherReducer,
  geoLocationWeatherReducer: geoLocationWeatherReducer.geoLocationReducer
};

export const getWeatherReducer = createFeatureSelector<weatherReducer.State>('weatherReducer');
export const getFiveDayWeatherReducer = createFeatureSelector<fiveDayWeatherReducer.State>('fiveDayWeatherReducer');
export const getGeoLocationReducer = createFeatureSelector<geoLocationWeatherReducer.State>('geoLocationWeatherReducer');
export const getWeatherData = createSelector(getWeatherReducer, weatherReducer.getWeatherData);
export const getFiveDayWeatherData = createSelector(getFiveDayWeatherReducer, fiveDayWeatherReducer.getFiveDayWeatherData);
export const getGeoLocationData = createSelector(getGeoLocationReducer, geoLocationWeatherReducer.getGeoLocationData);
