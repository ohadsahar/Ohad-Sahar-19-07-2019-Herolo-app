import {
  WeatherActions, GET_AUTO_COMPLETE_CITIES, GET_AUTO_COMPLETE_CITIES_SUCCESS, GET_AUTO_COMPLETE_CITIES_FAILED,
  GET_CURRENT_WEATHER, GET_CURRENT_WEATHER_SUCCESS, GET_CURRENT_WEATHER_FAILED, GET_FIVE_DAY_WEATHER,
  GET_FIVE_DAY_WEATHER_SUCCESS, GET_FIVE_DAY_WEATHER_FAILED, GET_GEOLOCATION_WEATHER, GET_GEOLOCATION_WEATHER_SUCCESS,
  GET_GEOLOCATION_WEATHER_FAILED
} from './../actions/weather.action';

export interface State {
  data: any;
  loading: boolean;
  loaded: boolean;
}

const initialState: State = {
  data: [],
  loading: false,
  loaded: false
};

export function weatherReducer(state = initialState, action: WeatherActions) {
  switch (action.type) {
    case GET_AUTO_COMPLETE_CITIES:

      return {
        ...state,
        loading: true,
        loaded: false,
        data: action.payload
      };
    case GET_AUTO_COMPLETE_CITIES_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.payload
      };
    case GET_AUTO_COMPLETE_CITIES_FAILED:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.payload
      };
    case GET_CURRENT_WEATHER:
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case GET_CURRENT_WEATHER_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.payload
      };
    case GET_CURRENT_WEATHER_FAILED:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.payload
      };
    default:
      return state;
  }
}
export const getWeatherData = (state: State) => state;
