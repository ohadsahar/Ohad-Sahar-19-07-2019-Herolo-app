import { WeatherActions, GET_GEOLOCATION_WEATHER, GET_GEOLOCATION_WEATHER_SUCCESS,
GET_GEOLOCATION_WEATHER_FAILED } from './../actions/weather.action';

export interface State {
  data: any;
  loading: boolean;
  loaded: boolean;
}

const initialState: State = {
  data: [],
  loading: true,
  loaded: false
};

export function geoLocationReducer(state = initialState, action: WeatherActions) {
  switch(action.type) {
    case GET_GEOLOCATION_WEATHER:
      return {
        ...state,
        loading: true,
        loaded: false,
        data: action.payload
      };
    case GET_GEOLOCATION_WEATHER_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.payload
      };
    case GET_GEOLOCATION_WEATHER_FAILED:
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

export const getGeoLocationData = (state: State ) => state;
