import { LocationModel } from './../../shared/models/geolocation.model';
import { FiveDayWeatherHeadLine } from './../../shared/models/five-day-headlines.model';
import { FiveDayWeatherModel } from './../../shared/models/five-day-data.model';
import { CurrentWeatherModel } from './../../shared/models/current-weather.model';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { AutoCompleteCityModel } from './../../shared/models/auto-complete.model';
import { Injectable } from '@angular/core';

const autoCompleteUrl = environment.autoCompleteUrl;
const currentWeatherUrl = environment.currentWeatherUrl;
const fiveDayWeatherUrl = environment.fiveDayWeatherUrl;
const geoLocationWeatherUrl = environment.geoLocationWeatherUrl;
const apiKey = 'vkXJMIjHfHLFm0XdpikB50j9pejRxC3F';

@Injectable({ providedIn: 'root' })

export class WeatherService {

  constructor(private http: HttpClient) { }
  getAutoCompleteCities(cityRequest: string) {
    return this.http.get<{ message: AutoCompleteCityModel }>(`${autoCompleteUrl}?apikey=${apiKey}&q=${cityRequest}`);
  }
  getCurrentWeather(key: number) {
    return this.http.get<{ message: CurrentWeatherModel }>(`${currentWeatherUrl}${key}?apikey=${apiKey}`);
  }
  getCurrentWeatherGeolocation(data: LocationModel) {
    return this.http.get<{Key: string, LocalizedName: string}>(`${geoLocationWeatherUrl}?apikey=${apiKey}&q=${data.x},${data.y}`);
  }
  getFiveDayWeather(key: number, metric: boolean) {
    return this.http.get<{DailyForecasts: FiveDayWeatherModel, Headline: FiveDayWeatherHeadLine }>
    (`${fiveDayWeatherUrl}${key}?apikey=${apiKey}&metric=${metric}`);
  }
}


