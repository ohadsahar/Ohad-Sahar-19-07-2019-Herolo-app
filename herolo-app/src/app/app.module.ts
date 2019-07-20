import { AngularMaterialModule } from './modules/angular-material.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Reducers } from './app.reducer';
import { FavoriteComponent } from './core/components/favorite/favorite.component';
import { MenuComponent } from './core/components/menu/menu.component';
import { WeatherDisplayComponent } from './core/components/weather-display/weather-display.component';
import { WeatherEffects } from './store/effects/weather.effect';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    WeatherDisplayComponent,
    FavoriteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
    Ng4LoadingSpinnerModule.forRoot(),
    StoreModule.forRoot(Reducers),
    EffectsModule.forRoot([WeatherEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
