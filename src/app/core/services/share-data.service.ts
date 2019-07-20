import { BehaviorSubject } from 'rxjs';
import { Injectable } from "@angular/core";


@Injectable({providedIn: 'root'})

export class ShareDataService {

  private unitSource = new BehaviorSubject(false);
  private themeSource = new BehaviorSubject(false);
  private citySource = new BehaviorSubject(null);
  currentCity = this.citySource.asObservable();
  currentTheme = this.themeSource.asObservable();
  currentUnit = this.unitSource.asObservable();

  constructor() {}

  changeCity(city: string) {
    this.citySource.next(city);
  }
  changeTheme(value: boolean) {
    this.themeSource.next(value);
  }
  changeUnit(value: boolean) {
    this.unitSource.next(value);
  }

}
