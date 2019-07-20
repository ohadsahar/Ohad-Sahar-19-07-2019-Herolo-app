export interface FiveDayWeatherModel {
  DailyForecasts: [{
    Date: string,
    Temperature: {
      Minimum: {
        Value: number,
        Unit: string,
        UnitType: number
      },
      Maximum: {
        Value: number,
        Unit: string,
        UnitType: number
      }
    },
    Day: {
      Icon: 1,
      IconPhrase: string,
    },
    Night: {
      IconPhrase: string,
    },
    MobileLink: string,
    Link: string;
  }];
  DayInWeek: string;
}
