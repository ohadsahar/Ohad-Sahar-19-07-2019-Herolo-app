import { Component, OnInit, HostBinding } from '@angular/core';
import { DisplayCityDataModel } from 'src/app/shared/models/city-data.model';
import { ShareDataService } from '../../services/share-data.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';
import { routeSlideRightTrigger } from 'src/app/shared/animations/route.animation';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css'],
  animations: [routeSlideRightTrigger]
})

export class FavoriteComponent implements OnInit {
  @HostBinding('@routeSlideRight') routeAnimation = true;
  public favoriteCities: DisplayCityDataModel[] = [];
  public exists: boolean;
  public checked: boolean;
  public unit: boolean;
  public loaded: boolean;
  constructor(private shareDataService: ShareDataService, private router: Router,private spinnerService: Ng4LoadingSpinnerService) {
    this.exists = false;
    this.loaded = false;
  }
  ngOnInit() {
    this.onLoadComponent();
  }
  onLoadComponent() {
    this.startSpinner();
    this.shareDataService.currentUnit.subscribe(response => {
      this.unit = response;
    });
    this.shareDataService.currentTheme.subscribe(response => {
      this.checked = response;
      this.checkFavoriteCitiesExists();
    });
  }
  moreInfoCity(city: string, key: number, countryID: string) {
    const data = {city, key, countryID};
    this.shareDataService.changeCity(JSON.stringify(data));
    this.router.navigate(['weather-display']);
  }
  checkFavoriteCitiesExists() {
    if (JSON.parse(localStorage.getItem('cities'))) {
      this.favoriteCities = JSON.parse(localStorage.getItem('cities'));
      this.exists = true;
    } else {
      this.exists = false;
    }
    this.stopSpinner(true);
  }
  startSpinner() {
    this.loaded = false;
    this.spinnerService.show();
  }
  stopSpinner(value: boolean) {
    this.loaded = value;
    this.spinnerService.hide();
  }
}
