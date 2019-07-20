import { Component, HostBinding, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { routeFadeStateTrigger } from 'src/app/shared/animations/route.animation';
import * as fromRoot from '../../../app.reducer';
import * as weatherActions from '../../../store/actions/weather.action';
import { itemStateTrigger } from './../../../shared/animations/route.animation';
import { AutoCompleteCityModel } from './../../../shared/models/auto-complete.model';
import { DisplayCityDataModel } from './../../../shared/models/city-data.model';
import { CurrentWeatherModel } from './../../../shared/models/current-weather.model';
import { FiveDayWeatherModel } from './../../../shared/models/five-day-data.model';
import { FiveDayWeatherHeadLine } from './../../../shared/models/five-day-headlines.model';
import { MessageService } from './../../services/message.service';
import { ShareDataService } from './../../services/share-data.service';

@Component({
  selector: 'app-weather-display',
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.css'],
  animations: [
    routeFadeStateTrigger,
    itemStateTrigger
  ]
})

export class WeatherDisplayComponent implements OnInit, OnDestroy {
  @HostBinding('@routeFadeState') routeAnimation = true;
  public fiveDayWeather: FiveDayWeatherModel;
  public saveFarWeather: FiveDayWeatherModel;
  public fiveDayWeatherHeadLines: FiveDayWeatherHeadLine;
  public currentWeather: CurrentWeatherModel;
  public displayWeather: DisplayCityDataModel;
  public favoriteCities: DisplayCityDataModel[] = [];
  public metric: boolean;
  public currentCity: string;
  public defaultKey: string;
  public defaultCity: string;
  public loaded: boolean;
  public exist: boolean;
  public checked: boolean;
  public unit: boolean;
  public regEng = new RegExp('[a-zA-Z]+');
  public choose: boolean;
  options: AutoCompleteCityModel[];
  timer: any;

  public currentSubscribe: Subscription;
  public dataToSubscribe: Subscription;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  private currentWeather$: Subject<void> = new Subject<void>();

  constructor(private shareDataService: ShareDataService,
              private messageService: MessageService, private store: Store<fromRoot.State>,
              private spinnerService: Ng4LoadingSpinnerService) {
    this.metric = true;
    this.defaultKey = '215854';
    this.defaultCity = 'Tel Aviv';
    this.exist = false;
    this.choose = false;

  }
  ngOnInit() {
    this.onLoadComponent();
  }
  onLoadComponent(): void {
    // A function to organize
    this.startSpinner();
    this.setData();
    this.shareDataService.currentCity.subscribe(response => {
      if (response) {
        this.loaded = false;
        const data = { key: JSON.parse(response).key, city: JSON.parse(response).city };
        this.getWeather(data.key, data.city);
      } else {
        this.showMyLocation();
      }
    });
  }
  searchWeather($event): void {
    // Search function by city name, Use the timer to avoid a lot of calls to Data Base
    this.currentCity = $event.target.value;
    if (this.regEng.test(this.currentCity)) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        if (this.currentCity.length > 0) {
          this.choose = false;
          this.store.dispatch(new weatherActions.GetAutoCompleteCities(this.currentCity));
          this.dataToSubscribe = this.store.select(fromRoot.getWeatherData).pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((data) => {
              if (data.loaded) {
                this.options = data.data;
              }
            }, (error) => {
              this.messageService.failedMessage(error, 'Close');
            });
        }
        clearTimeout(this.timer);
      }, 1000);
    } else {
      if (this.currentCity.length > 0) {
        $event.target.value = '';
        this.messageService.failedMessage('Only English letters can be entered', 'Close');
      }
    }
  }
  showMyLocation(): void {
    // This function allows the user to use his location for the weather if the user does not get the weather from Tel Aviv
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const x = position.coords.latitude;
        const y = position.coords.longitude;
        const location = { x, y };
        this.store.dispatch(new weatherActions.GetGeoLocation(location));
        const dataToSubscribeGeo = this.store.select(fromRoot.getGeoLocationData).pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data) => {
            if (data.loaded) {
              localStorage.setItem('response', JSON.parse(JSON.stringify(data.data)));
              this.defaultKey = data.data.Key;
              this.defaultCity = data.data.LocalizedName;
              this.getWeather(data.data.Key, data.data.LocalizedName);
              dataToSubscribeGeo.unsubscribe();
            }
          }, (error) => {
            this.messageService.failedMessage(error, 'Close');
          });
      },
        () => {
          this.getWeather(this.defaultKey, this.defaultCity);
          this.checkSpecificCityExists(this.defaultCity);
        });
    }
  }
  getWeather(key: string, city: string): void {
    this.choose = true;
    this.displayWeather.city = city;
    // This function accepts the key and the city name and brings the data up
    this.checkSpecificCityExists(city);
    const intKey = Number(key);
    this.store.dispatch(new weatherActions.GetCurrentWeather(intKey));
    this.currentSubscribe = this.store.select(fromRoot.getWeatherData).pipe(takeUntil(this.currentWeather$))
      .subscribe((data) => {
        if (data.loaded && this.choose) {
          this.currentWeather = data.data[0];
          this.messageService.successMessage(`The weather for ${this.displayWeather.city} was successfully loaded`, 'Close');
          this.assignWeatherCityData(intKey);
          this.getFiveDayWeather(intKey);
        }
      },
        (error) => {
          this.messageService.failedMessage(error, 'Close');
        });

  }
  getFiveDayWeather(key: number): void {
    // This function brings the 5 days of weather for the current city
    this.store.dispatch(new weatherActions.GetFiveDayWeather(key, this.metric));
    this.dataToSubscribe = this.store.select(fromRoot.getFiveDayWeatherData).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data) => {
        if (data.loaded) {
          if (this.choose) {
            this.fiveDayWeather = data.data.DailyForecasts;
            this.fiveDayWeatherHeadLines = data.data.Headline;
            const save = this.fiveDayWeather;
            this.saveFarWeather = save;
            this.changeUnit();
            this.stopSpinner(data.loaded);
            this.choose = false;
          }
        }
      },
        (error) => {
          this.messageService.failedMessage(error, 'Close');
        });

  }
  changeUnit(): void {
    // This function replaces the measurement units of the degrees respectively
    let i = 0;
    let value = 0;
    let fahToCelFormula = (value - 32) / (9 / 5);
    let celToFahFormula = value * (9 / 5) + 32;
    if (this.unit) {
      if (this.fiveDayWeather && this.fiveDayWeather[0].Temperature.Minimum.Unit === 'F') {
        for (i = 0; i < 5; i++) {
          value = this.fiveDayWeather[i].Temperature.Maximum.Value;
          fahToCelFormula = (value - 32) / (9 / 5);
          this.fiveDayWeather[i].Temperature.Maximum.Value = fahToCelFormula.toFixed(0);
          value = this.fiveDayWeather[i].Temperature.Minimum.Value;
          fahToCelFormula = (value - 32) / (9 / 5);
          this.fiveDayWeather[i].Temperature.Minimum.Value = fahToCelFormula.toFixed(0);
          this.fiveDayWeather[i].Temperature.Minimum.Unit = 'C';
          this.fiveDayWeather[i].Temperature.Maximum.Unit = 'C';
        }
      }
    } else {
      if (this.fiveDayWeather && this.fiveDayWeather[0].Temperature.Minimum.Unit === 'C') {
        for (i = 0; i < 5; i++) {
          value = this.fiveDayWeather[i].Temperature.Maximum.Value;
          celToFahFormula = value * (9 / 5) + 32;
          this.fiveDayWeather[i].Temperature.Maximum.Value = celToFahFormula.toFixed(0);
          value = this.fiveDayWeather[i].Temperature.Minimum.Value;
          celToFahFormula = value * (9 / 5) + 32;
          this.fiveDayWeather[i].Temperature.Minimum.Value = celToFahFormula.toFixed(0);
          this.fiveDayWeather[i].Temperature.Minimum.Unit = 'F';
          this.fiveDayWeather[i].Temperature.Maximum.Unit = 'F';
        }
      }
    }
  }
  addToFavorite(): void {
    // This function adds a city selected to favorites, locally
    this.checkFavoriteCitiesExists();
    this.favoriteCities.push(this.displayWeather);
    localStorage.setItem('cities', JSON.stringify(this.favoriteCities));
    this.checkSpecificCityExists(this.displayWeather.city);
    this.messageService.successMessage(`The weather for ${this.displayWeather.city} was added to favorites`, 'Close');
  }
  removeFromFavorite(): void {
    // This function deletes a locally selected city locally
    this.checkFavoriteCitiesExists();
    const index = this.favoriteCities.findIndex(city => city.city === this.displayWeather.city);
    if (index >= 0) {
      this.favoriteCities.splice(index, 1);
      localStorage.removeItem('cities');
      localStorage.setItem('cities', JSON.stringify(this.favoriteCities));
      this.checkSpecificCityExists(this.displayWeather.city);
      this.messageService.successMessage(`The weather for ${this.displayWeather.city} was removed from favorites`, 'Close');
    }
  }
  checkFavoriteCitiesExists(): void {
    // This function checks whether a particular city is in the Favorites
    if (JSON.parse(localStorage.getItem('cities'))) {
      this.favoriteCities = JSON.parse(localStorage.getItem('cities'));
    }
  }
  checkSpecificCityExists(city: string): void {
    // This function checks if a city is already in the array if it does not add again
    const index = this.favoriteCities.find(arrayCity => arrayCity.city === city);
    if (index) {
      this.exist = true;
    } else {
      this.exist = false;
    }
  }
  setModel(): void {
    // Applying initial variables to the interface
    this.displayWeather = {
      key: 0,
      city: '',
      Country: {
        ID: '',
        LocalizedName: '',
      },
      Temperature: {
        Metric: {
          Value: 0,
          Unit: '',
          UnitType: 0
        },
        Imperial: {
          Value: 0,
          Unit: '',
          UnitType: 0
        }
      },
      weatherText: '',
      link: '',
      mobileLink: '',
      dayTime: false
    };
  }
  assignWeatherCityData(intKey: number): void {
    // Placing variables into an array that the user is viewing
    this.displayWeather.key = intKey;
    this.displayWeather.dayTime = this.currentWeather.IsDayTime;
    this.displayWeather.link = this.currentWeather.Link;
    this.displayWeather.mobileLink = this.currentWeather.MobileLink;
    this.displayWeather.Temperature = this.currentWeather.Temperature;
    this.displayWeather.weatherText = this.currentWeather.WeatherText;
  }
  setData(): void {
    // Assignment of data transmitted between the components
    this.shareDataService.currentUnit.subscribe(response => {
      this.unit = response;
      this.metric = response;
      this.changeUnit();
    }, (error) => {
      this.messageService.failedMessage(error, 'Close');
    });
    this.shareDataService.currentTheme.subscribe(responseTheme => {
      this.checked = responseTheme;
    }, (error) => {
      this.messageService.failedMessage(error, 'Close');
    });
    this.setModel();
    this.checkFavoriteCitiesExists();
  }
  startSpinner() {
    this.loaded = false;
    this.spinnerService.show();
  }
  stopSpinner(value: boolean) {
    this.loaded = value;
    this.spinnerService.hide();
  }
  ngOnDestroy() {

    this.dataToSubscribe.unsubscribe();
    this.currentSubscribe.unsubscribe();
  }
}
