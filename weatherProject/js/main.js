import {
  selectTabNav,
  selectTabContent
} from "./tabs.js";

import {
  storage
} from "./storage.js";

import {
  UI_ELEMENTS
} from "./view.js";

export {
  buildFavourite,
  pushFav,
  sendRequest
}

let inputValue = undefined;
let currentTemp = null;
let imgSrc = undefined;
let formatedTime = null;

const BASE_INFO = {
  city: undefined,
  currentTemp: null,
  feelsLikeTemp: null,
  weather: undefined,
  sunriseTime: null,
  sunsetTime: null,
  forecast: [{
      date: null,
      temp: null,
      fellsLike: null,
      time: null,
      weather: undefined,
      icon: undefined,
    },
    {
      date: null,
      temp: null,
      fellsLike: null,
      time: null,
      weather: undefined,
      icon: undefined,
    },
    {
      date: null,
      temp: null,
      fellsLike: null,
      time: null,
      weather: undefined,
      icon: undefined,
    },
    {
      date: null,
      temp: null,
      fellsLike: null,
      time: null,
      weather: undefined,
      icon: undefined,
    },
    {
      date: null,
      temp: null,
      fellsLike: null,
      time: null,
      weather: undefined,
      icon: undefined,
    },
    {
      date: null,
      temp: null,
      fellsLike: null,
      time: null,
      weather: undefined,
      icon: undefined,
    },
    {
      date: null,
      temp: null,
      fellsLike: null,
      time: null,
      weather: undefined,
      icon: undefined,
    },

  ]
}

const favList = [];
const isInputEmpty = inputValue === '';

UI_ELEMENTS.tabNav.forEach(item => {
  item.addEventListener('click', selectTabNav)
});

UI_ELEMENTS.formElement.addEventListener('submit', sendRequest);

UI_ELEMENTS.selectFavouriteElement.addEventListener('click', favHandler);

function sendRequest(value) {
  const isNotValid = typeof value !== 'string' &
    UI_ELEMENTS.inputElement.value === '';

  if (isNotValid) {
    console.log(UI_ELEMENTS.inputElement.value);
    alert("Enter the city..");
    return;
  } else {
    inputValue = UI_ELEMENTS.inputElement.value || value;
    console.log(typeof UI_ELEMENTS.inputElement.value);
    console.log(typeof value);
    console.log(UI_ELEMENTS.inputElement.value);
    console.log(value);
    inputValue.trim();
    console.log(inputValue);

    let weatherPromis = new Promise(function (resolve, reject) {
      resolve(getWeatherData().then(data => saveWeatherData(data)))
    })

    let forecastPromis = new Promise(function (resolve, reject) {
      resolve(getForecast().then(data => saveForecastData(data)))
    })

    Promise.all([weatherPromis, forecastPromis])
      .then(() => BASE_INFO.city = inputValue)
      .then(() => storage.setCurrentCity(BASE_INFO.city))
      .then(setValue)
  }
}

function saveWeatherData(data) {
  imgSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
  BASE_INFO.currentTemp = data.main.temp;
  BASE_INFO.feelsLikeTemp = data.main.feels_like;
  BASE_INFO.weather = data.weather[0].main;
  BASE_INFO.sunriseTime = formatTime(data.sys.sunrise);
  BASE_INFO.sunsetTime = formatTime(data.sys.sunset);
  console.log("save");
}

function saveForecastData(data) {
  console.log(BASE_INFO.forecast.length);
  for (let i = 0; i < BASE_INFO.forecast.length; i++) {
    BASE_INFO.forecast[i].date = formatTime(data.list[i].dt_txt, 'date');
    BASE_INFO.forecast[i].temp = data.list[i].main.temp;
    BASE_INFO.forecast[i].fellsLike = data.list[i].main.feels_like;
    BASE_INFO.forecast[i].time = formatTime(data.list[i].dt);
    BASE_INFO.forecast[i].weather = data.list[i].weather[0].main;
    BASE_INFO.forecast[i].icon = `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@4x.png`
    console.log(BASE_INFO.forecast[i].date);
  }
  
}

function getWeatherData() {
  const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
  const apiKey = 'e03aeb1432d5c11530444113b79204b8';
  const unitsOfMeasure = 'metric'
  const url = `${serverUrl}?q=${inputValue}&appid=${apiKey}&units=${unitsOfMeasure}`;

  return fetch(url).then((response) => {
    if ((!response.ok) & (response.status !== 404) & (!inputValue === '')) {
      throw new Error("Unexpected error.")
    }

    return response.json();
  })
}

function getForecast() {
  const serverUrl = 'http://api.openweathermap.org/data/2.5/forecast';
  const apiKey = 'a9820497dd56291092de48b73ac4cfdf';
  const unitsOfMeasure = 'metric';
  const url = `${serverUrl}?q=${inputValue}&appid=${apiKey}&units=${unitsOfMeasure}`;

  return fetch(url).then((response) => {
    if ((!response.ok) & (response.status !== 404) & (!inputValue === '')) {
      throw new Error("Unexpected error.")
    }

    return response.json();
  })

}


function setValue() {
  selectDOMElements();

  UI_ELEMENTS.cityValueNowElement.forEach(item => {
    item.textContent = BASE_INFO.city;
  });

  UI_ELEMENTS.tempValueNowElement.forEach(item => {
    item.textContent = BASE_INFO.currentTemp;
  });

  UI_ELEMENTS.tempValueFeelsLikeElement.forEach((item, i) => {
    item.textContent = BASE_INFO.feelsLikeTemp;
  })

  UI_ELEMENTS.typeOfWeatherElement.textContent = BASE_INFO.weather;
  UI_ELEMENTS.sunriseInfoElement.textContent = BASE_INFO.sunriseTime;
  UI_ELEMENTS.sunsetInfoElement.textContent = BASE_INFO.sunsetTime;

  UI_ELEMENTS.weatherImageElement.style.backgroundImage = "url(" + imgSrc + ")";

  UI_ELEMENTS.timeValueElement.forEach((element, i) => {
    element.textContent = BASE_INFO.forecast[i].time;
    console.log(BASE_INFO.forecast[i].time);
  });

  UI_ELEMENTS.tempValueElement.forEach((element, i) => {
    element.textContent = BASE_INFO.forecast[i].temp;
    console.log(BASE_INFO.forecast[i].temp);
  });

  UI_ELEMENTS.forecastTempFeelsLikeElement.forEach((element, i) => {
    element.textContent = BASE_INFO.forecast[i].fellsLike;
  });

  UI_ELEMENTS.forecastTypeOfWeatherElement.forEach((element, i) => {
    element.textContent = BASE_INFO.forecast[i].weather;
  });

  UI_ELEMENTS.weatherIconElement.forEach((element, i) => {
    element.setAttribute('src', BASE_INFO.forecast[i].icon)
  });

  UI_ELEMENTS.dataValueElement.forEach((element, i) => {
    element.textContent = BASE_INFO.forecast[i].date;
  });
  
  isFavExists();
}

function selectDOMElements() {
  UI_ELEMENTS.cityValueNowElement = document.querySelectorAll('.cityValue');
  UI_ELEMENTS.tempValueNowElement = document.querySelectorAll('.temperatureValue');
  UI_ELEMENTS.tempValueFeelsLikeElement = document.querySelectorAll('.feelsLikeValue');
  UI_ELEMENTS.typeOfWeatherElement = document.querySelector('.typeOfWeatherValue');
  UI_ELEMENTS.sunriseInfoElement = document.querySelector('.sunriseInfo');
  UI_ELEMENTS.sunsetInfoElement = document.querySelector('.sunsetInfo')
}

function resetDefault() {
  TOOL.resetInput();
  TOOL.removeActiveClass();
}

const TOOL = {
  resetInput: () => UI_ELEMENTS.inputElement.value = '',
  removeActiveClass: () => UI_ELEMENTS.selectFavouriteElement.classList.remove('weather-app__info-favourite--active'),
  addActiveClass: () => UI_ELEMENTS.selectFavouriteElement.classList.add('weather-app__info-favourite--active'),
}

function favHandler() {
  const NO_SUCH_CITY = !isInputEmpty & (typeof BASE_INFO.city !== 'undefined');

  if (this.classList.contains('weather-app__info-favourite--active')) {
    for (let i = 0; i < favList.length; i++) {
      if (favList[i].name === BASE_INFO.city) {
        favList.splice(i, 1);
        storage.deleteFavouriteCitie();
        storage.saveFavoriteCities(favList);
        console.log(UI_ELEMENTS.favouriteElementsList.lastElementChild);
        console.log(UI_ELEMENTS.favouriteElementsList.childNodes.length);

        console.log(favList);
        this.classList.toggle('weather-app__info-favourite--active');
      }
    }

    for (let j = 0; j < UI_ELEMENTS.favouriteElementsList.childNodes.length; j++) {
      const isEqualElement = UI_ELEMENTS.favouriteElementsList.childNodes[j].textContent === BASE_INFO.city;
      if (isEqualElement) {
        UI_ELEMENTS.favouriteElementsList.childNodes[j].remove();
        console.log(j);
      }
    }
  } else if (NO_SUCH_CITY) {
    buildFavourite();
    console.log(typeof BASE_INFO.city);

    pushFav(BASE_INFO.city);

    storage.saveFavoriteCities(favList);

    this.classList.toggle('weather-app__info-favourite--active');
  }
}

function buildFavourite(value) {
  const fav = document.createElement('li');
  const favDel = document.createElement('span')
  fav.classList.add('weather-app__locations-item');
  favDel.classList.add('weather-app__locations-delete');

  fav.textContent = BASE_INFO.city;
  fav.append(favDel);

  let a = document.querySelector('.weather-app__locations-list')

  a.append(fav);
  console.log(favDel.parentNode);
  console.log(favDel);

  favDel.addEventListener('click', delFavourite);

  fav.addEventListener('click', selectedCity);

  if (value) {
    fav.append(value);
    a.append(fav);
  }

  return fav;
}

function selectedCity() {
  sendRequest(this.textContent);
  console.log(typeof this.textContent);
}

function delFavourite() {
  for (let i = 0; i < favList.length; i++) {
    if (favList[i].name === this.parentNode.textContent) {
      favList.splice(i, 1);
      console.log(favList);
      storage.deleteFavouriteCitie();
      storage.saveFavoriteCities(favList);
      this.parentNode.remove();
    }
  }
}

function isFavExists() {
  if (favList.length > 0) {
    for (let i = 0; i < favList.length; i++) {
      if (favList[i].name === BASE_INFO.city) {
        TOOL.resetInput();
        TOOL.addActiveClass();
        console.log('Great');
        break
      } else {
        resetDefault();
        console.log('No');
      }
    }
  } else {
    resetDefault();
    console.log('length');
  }
}

function pushFav(name) {
  const newFav = {
    id: favList.length + 1,
    name: name,
  }

  favList.push(newFav);
  console.log(favList);
}

function formatTime(value, type) {
  const unix_timestamp = value;
  const time = new Date(unix_timestamp * 1000);
  
  const timeHours = time.getHours();
  const timeMinutes = "0" + time.getMinutes();
  const timeMounth = time.toLocaleString('eng', {
    month: 'long'
  });

  if (!type) {
    return timeHours + ':' + timeMinutes.substr(-2);
  } else if(type === 'date'){
      return new Date().toLocaleString('en-GB', {
        month: 'long',
        day: 'numeric'
      });
  }

}

window.onload = function () {
  storage.getFavoriteCities();
  console.log(formatTime(1642216316));
}