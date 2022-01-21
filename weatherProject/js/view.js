const UI_ELEMENTS = {
  tabNav: document.querySelectorAll('.weather-app__info-btn'),
  tabContent: document.querySelectorAll('.tab'),
  inputElement: document.querySelector('.weather-app__input'),
  formElement: document.querySelector('.weather-app__form'),
  weatherImageElement: document.querySelector('.weather-app__info-status'),
  selectFavouriteElement: document.querySelector('.weather-app__info-favourite'),
  favouriteElementsList: document.querySelector('.weather-app__locations-list'),
  forecastElementsList: document.querySelector('.weather-app__info-weather'),
  dataValueElement: document.querySelectorAll('.dataValue'),
  timeValueElement: document.querySelectorAll('.timeValue'),
  typeOfWeatherValueElement: document.querySelector('.typeOfWeatherValue'),
  weatherIconElement: document.querySelectorAll('.weatherIcon'),
  tempValueElement: document.querySelectorAll('.tempValue'),
  forecastTempFeelsLikeElement: document.querySelectorAll('.forecastFeelsLikeValue'),
  forecastTypeOfWeatherElement: document.querySelectorAll('.forecastTypeOfWeatherValue')
}

export {
  UI_ELEMENTS
}