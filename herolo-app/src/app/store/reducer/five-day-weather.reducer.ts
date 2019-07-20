import {
  WeatherActions, GET_FIVE_DAY_WEATHER,
  GET_FIVE_DAY_WEATHER_SUCCESS, GET_FIVE_DAY_WEATHER_FAILED
} from './../actions/weather.action';

export interface State {

  data: any;
  loading: boolean;
  loaded: boolean;
}

const initialState: State = {
  data: [],
  loading: true,
  loaded: false,
};

export function fiveDayWeatherReducer(state = initialState, action: WeatherActions) {

  switch (action.type) {
    case GET_FIVE_DAY_WEATHER:
      return {
        ...state,
        loading: true,
        loaded: false,
        data: action.payload
      };
    case GET_FIVE_DAY_WEATHER_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.payload
      };
    case GET_FIVE_DAY_WEATHER_FAILED:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.payload
      };
    default: {
      return state;
    }
  }
}

export const getFiveDayWeatherData = (state: State) => state;

