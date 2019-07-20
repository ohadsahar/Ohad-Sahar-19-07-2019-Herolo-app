import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { WeatherService } from 'src/app/core/services/weather.service';
import * as weatherActions from '../actions/weather.action';

@Injectable()
export class WeatherEffects {
  constructor(private actions$: Actions, private weatherService: WeatherService) { }

  @Effect()
  public weatherData$ = this.actions$.pipe(ofType(weatherActions.GET_AUTO_COMPLETE_CITIES))
    .pipe(exhaustMap((action: weatherActions.GetAutoCompleteCities) => {
      return this.weatherService.getAutoCompleteCities(action.payload)
        .pipe(map(data => new weatherActions.GetAutoCompleteCitiesSuccess(data)),
          catchError(error => of(new weatherActions.GetAutoCompleteCitiesFailed(error)
          )));
    }));

  @Effect()
  public currentWeatherData$ = this.actions$.pipe(ofType(weatherActions.GET_CURRENT_WEATHER))
    .pipe(exhaustMap((action: weatherActions.GetCurrentWeather) => {
      return this.weatherService.getCurrentWeather(action.payload)
        .pipe(map(data => new weatherActions.GetCurrentWeatherSuccess(data)),
          catchError(error => of(new weatherActions.GetCurrentWeatherFailed(error)
          )));
    }));

  @Effect()
  public fiveDayWeatherData$ = this.actions$.pipe(ofType(weatherActions.GET_FIVE_DAY_WEATHER))
    .pipe(exhaustMap((action: weatherActions.GetFiveDayWeather) => {
      return this.weatherService.getFiveDayWeather(action.payload, action.metric)
        .pipe(map(data => new weatherActions.GetFiveDayWeatherSuccess(data)),
          catchError(error => of(new weatherActions.GetFiveDayWeatherFailed(error)
          )));
    }));

  @Effect()
  public geolocationData$ = this.actions$.pipe(ofType(weatherActions.GET_GEOLOCATION_WEATHER))
    .pipe(exhaustMap((action: weatherActions.GetGeoLocation) => {
      return this.weatherService.getCurrentWeatherGeolocation(action.payload)
        .pipe(map(data => new weatherActions.GetGeoLocationSuccess(data)),
          catchError(error => of(new weatherActions.GetGeoLocationFailed(error)
          )));
    }));
}

