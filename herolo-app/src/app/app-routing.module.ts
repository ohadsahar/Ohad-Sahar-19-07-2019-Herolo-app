import { FavoriteComponent } from './core/components/favorite/favorite.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeatherDisplayComponent } from './core/components/weather-display/weather-display.component';


const routes: Routes = [
  {path: 'weather-display', component: WeatherDisplayComponent},
  {path: 'favorite-display', component: FavoriteComponent},
  {path: '**', redirectTo: 'weather-display'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
