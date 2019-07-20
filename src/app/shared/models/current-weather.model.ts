export interface CurrentWeatherModel {
  LocalObservationDateTime: string;
  WeatherText: string;
  IsDayTime: boolean;
  Temperature: {
    Metric: {
      Value: number,
      Unit: string,
      UnitType: number
    },
    Imperial: {
      Value: number,
      Unit: string,
      UnitType: number
    }
  };
  MobileLink: string;
  Link: string;
}
