import axios from 'axios';
import {getWindDirectionFunc} from '@/helper/helperWeather.js';

export const weatherModule = {
    namespaced: true,
    state: () => ({
        weather: null,
        weatherOnFiveDays: null,
        currentAirPollutionData: null,
        airPollutionDataForecast: null,
        cityName: '',
        cityNameInFormInput: '',
        apiKey: 'f4adc48f5c500c2934f9ebd23672b601',
        apiKeyFromGeoapify: '84ae3898d4c94f3ba4823d25e69f2315',
        units: 'metric',
        language: 'ru',
        citiesCountLimit: 1,
        coordLat: '',
        coordLon: '',
        cityNameInTitle: '',
        cityNameForLocalStorage: '',
        byCoordsDuringAppStart: false,
        isWeatherLoaded: false,
        errorGettingWeather: false,
    }),
    getters: {
        getUrlForWeatherCurrentByCityName(state) {
            return `https://api.openweathermap.org/data/2.5/weather?q=${state.cityName}&appid=${state.apiKey}&units=${state.units}&lang=${state.language}`
        },
        getUrlForWeatherOnFiveDaysByCityName(state) {
            return `https://api.openweathermap.org/data/2.5/forecast?q=${state.cityName}&appid=${state.apiKey}&units=${state.units}&lang=${state.language}`
        },
        getCityNameByCoords(state) {
            return `https://api.openweathermap.org/geo/1.0/reverse?lat=${state.coordLat}&lon=${state.coordLon}&limit=${state.citiesCountLimit}&appid=${state.apiKey}`
        },
        getFullAddressByCoords(state) {
            return `https://api.geoapify.com/v1/geocode/reverse?lat=${state.coordLat}&lon=${state.coordLon}&apiKey=${state.apiKeyFromGeoapify}`
        },
        getUrlForCoordsByCityName(state) {
            return `https://api.openweathermap.org/geo/1.0/direct?q=${state.cityName}&limit=${state.citiesCountLimit}&appid=${state.apiKey}`
        },
        getUrlForWeatherCurrentByCoords(state) {
            return `https://api.openweathermap.org/data/2.5/weather?lat=${state.coordLat}&lon=${state.coordLon}&appid=${state.apiKey}&units=${state.units}&lang=${state.language}`
        },
        getUrlForWeatherOnFiveDaysByCoords(state) {
            return `https://api.openweathermap.org/data/2.5/forecast?lat=${state.coordLat}&lon=${state.coordLon}&appid=${state.apiKey}&units=${state.units}&lang=${state.language}`
        },
        getUrlForCurrentAirPollutionData(state) {
            return `https://api.openweathermap.org/data/2.5/air_pollution?lat=${state.coordLat}&lon=${state.coordLon}&appid=${state.apiKey}`
        },
        getUrlForAirPollutionDataForecast(state) {
            return `https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${state.coordLat}&lon=${state.coordLon}&appid=${state.apiKey}`
        },
        getCloudsPercent(state) {
            const title = 'Облака';
            const testimony = state.weather.clouds.all;
            const units = '%';
            return {title, testimony, units}
        },
        getTemperature(state) {
            const title = 'Температура';
            const testimony = state.weather.main.temp;
            const units = '°C';
            return {title, testimony, units}
        },
        getFeelingTemperature(state) {
            const title = 'Ощущается';
            const testimony = state.weather.main.feels_like;
            const units = '°C';
            return {title, testimony, units}
        },
        getMaxTemperature(state) {
            const title = 'Макс. темп.';
            const testimony = state.weather.main.temp_max;
            const units = '°C';
            return {title, testimony, units}
        },
        getMinTemperature(state) {
            const title = 'Мин. темп.';
            const testimony = state.weather.main.temp_min;
            const units = '°C';
            return {title, testimony, units}
        },
        getPressure(state) {
            const title = 'Давление';
            const testimony = state.weather.main.pressure;
            const units = ' мм рт.ст.';
            return {title, testimony, units}
        },
        getHumidity(state) {
            const title = 'Влажность';
            const testimony = state.weather.main.humidity;
            const units = '%';
            return {title, testimony, units}
        },
        getSunrise(state) {
            const timezone = state.weather.timezone;
            const date = new Date((state.weather.sys.sunrise + timezone) * 1000);
            const localHours = date.getUTCHours();
            const localMinutes = date.getUTCMinutes();

            const title = 'Восход';
            const testimony = `${localHours < 10 ? `0${localHours}` : localHours}:${localMinutes < 10 ? `0${localMinutes}` : localMinutes}`;
            const units = '';

            return {title, testimony, units}
        },
        getSunset(state) {
            const timezone = state.weather.timezone;
            const date = new Date((state.weather.sys.sunset + timezone) * 1000);
            const localHours = date.getUTCHours();
            const localMinutes = date.getUTCMinutes();

            const title = 'Закат';
            const testimony = `${localHours < 10 ? `0${localHours}` : localHours}:${localMinutes < 10 ? `0${localMinutes}` : localMinutes}`;
            const units = '';

            return {title, testimony, units}
        },
        getVisibility(state) {
            const title = 'Видимость';
            const testimony = state.weather.visibility < 1000 ? state.weather.visibility : (state.weather.visibility / 1000).toFixed(1);
            const units = state.weather.visibility < 1000 ? ' м' : ' км';
            return {title, testimony, units}
        },
        getDescription(state) {
            const title = 'Описание';
            const testimonyBeforeUpdate = state.weather.weather[0].description;
            const testimony = testimonyBeforeUpdate ? testimonyBeforeUpdate[0].toUpperCase() + testimonyBeforeUpdate.slice(1) : 'н/д';

            const units = '';
            return {title, testimony, units}
        },
        getWindDirection(state) {
            const title = 'Напр. ветра';
            const degry = state.weather.wind.deg;
            const direction = getWindDirectionFunc(degry, false);

            const testimony = `${direction} `;

            const units = `${degry}° `;
            return {title, testimony, units, isDirectionIcon: true, degry}
        },
        getWindSpeed(state) {
            const title = 'Скорость ветра';
            const testimony = state.weather.wind.speed;
            const units = ' м/с';
            return {title, testimony, units}
        },
        getWindGusts(state) {
            const title = 'Порывы ветра';
            const testimony = state.weather.wind.gust ? state.weather.wind.gust : state.weather.wind.speed;
            const units = ' м/с';
            return {title, testimony, units}
        },
        getIcon(state) {
            const imgSrc = `https://openweathermap.org/img/w/${state.weather.weather[0].icon}.png`;
            const imgAlt = state.weather.weather[0].main;
            return {imgSrc, imgAlt}
        },
        weatherInfoList(state, getters) {
            return [
                getters.getTemperature,
                getters.getFeelingTemperature,
                //? getters.getMinTemperature,
                //? getters.getMaxTemperature,
                getters.getCloudsPercent,
                getters.getDescription,
                getters.getVisibility,
                getters.getWindDirection,
                getters.getWindSpeed,
                getters.getWindGusts,
                getters.getPressure,
                getters.getHumidity,
                getters.getSunrise,
                getters.getSunset,
            ]
        },
        getIsWeatherLoaded(state) {
            return state.isWeatherLoaded
        },
        getErrorGettingWeather(state) {
            return state.errorGettingWeather
        },
    },
    mutations: {
        setWeatherInfo(state, weather) {
            state.weather = weather;
        },
        setWeatherOnFiveDays(state, weatherOnFiveDays) {
            state.weatherOnFiveDays = weatherOnFiveDays;
        },
        setCurrentAirPollutionData(state, currentAirPollutionData) {
            state.currentAirPollutionData = currentAirPollutionData;
        },
        setAirPollutionDataForecast(state, airPollutionDataForecast) {
            state.airPollutionDataForecast = airPollutionDataForecast;
        },
        setCityName(state, cityName) {
            state.cityName = cityName;
        },
        setCityNameInFormInput(state, cityNameInFormInput) {
            state.cityNameInFormInput = cityNameInFormInput;
        },
        setCoordLat(state, coordLat) {
            state.coordLat = coordLat;
        },
        setCoordLon(state, coordLon) {
            state.coordLon = coordLon;
        },
        setCityNameInTitle(state, cityNameInTitle) {
            state.cityNameInTitle = cityNameInTitle;
        },
        setCityNameForLocalStorage(state, cityNameForLocalStorage) {
            state.cityNameForLocalStorage = cityNameForLocalStorage;
        },
        setByCoordsDuringAppStart(state, byCoordsDuringAppStart) {
            state.byCoordsDuringAppStart = byCoordsDuringAppStart;
        },
        setIsWeatherLoaded(state, isWeatherLoaded) {
            state.isWeatherLoaded = isWeatherLoaded;
        },
        setErrorGettingWeather(state, errorGettingWeather) {
            state.errorGettingWeather = errorGettingWeather;
        },
    },
    actions: {
        getCityNameFromLocalStorage({commit}) {
            commit('setCityName', JSON.parse(localStorage.getItem('location')) || '');
        },
        getByCoordsDuringAppStartFromLocalStorage({commit}) {
            commit('setByCoordsDuringAppStart', JSON.parse(localStorage.getItem('byCoords'))) || false;
        },
        getCityNameFromFormInput({commit}, cityNameFromFormInput) {
            commit('setCityName', cityNameFromFormInput);
        },
        getCoordsByUserLocation({state, commit, getters, dispatch}) {
            dispatch('isWeatherNotLoadedAction');
            dispatch('errorGettingWeatherAction', false);

            const success = async (position) => {
                const coordsLatitude  = position.coords.latitude;
                const coordsLongitude = position.coords.longitude;
            
                commit('setCoordLat', coordsLatitude);
                commit('setCoordLon', coordsLongitude);

                try {
                    const resFullAddress = await axios.get(getters.getFullAddressByCoords);
                    const resCityName = await axios.get(getters.getCityNameByCoords);

                    if (resCityName.status === 200 || resFullAddress.status === 200) {
                        const fullAddress = resFullAddress?.data?.features[0]?.properties;
                        const cityName = resCityName?.data[0]?.local_names;

                        const addressPlaceName = `${fullAddress?.name ? `${fullAddress?.name}, ` : ''}`;
                        const addressStreet = `${fullAddress?.street ? `${fullAddress?.street}, ` : ''}`;
                        const addressDistrict = `${fullAddress?.district ? `${fullAddress?.district}, ` : ''}`;
                        const addressCity = `${cityName[state.language] || cityName['en'] || fullAddress?.city}`;

                        const addressInTitle = `${addressPlaceName && addressPlaceName !== addressStreet ? addressPlaceName : ''}${addressStreet}${addressDistrict}${addressCity}` || `Широта: ${coordsLatitude}, Долгота: ${coordsLongitude}`;

                        commit('setCityNameInTitle', addressInTitle);

                        localStorage.setItem('byCoords', JSON.stringify(true));

                        await dispatch('getWeather');
                    } else {
                        throw {message: 'Нет данных!'}
                    }
                } catch(error) {
                    alert(`${error.message}`);
                    dispatch('isWeatherLoadedAction');
                    dispatch('errorGettingWeatherAction', `${error.message}`);
                }
            };
            
            const error = (error) => {
                alert(`Ошибка получения данных о местоположении!\n${error.code}: ${error.message}`);
                dispatch('isWeatherLoadedAction');
                dispatch('errorGettingWeatherAction', `Ошибка получения данных о местоположении!\n${error.code}: ${error.message}`);
            };

            const options = { //* - Подробнее на сайте: "https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition".
                enableHighAccuracy: true, //* - Логическое значение, указывающее, что приложение хотело бы получить наилучшие возможные результаты.
                timeout: Infinity, //* -  Максимальное время (в миллисекундах), которое может потребоваться устройству для возврата позиции.
                maximumAge: 60 * 1000, //* - Максимальный возраст в миллисекундах возможной кэшированной позиции.
            };
            
            if (!navigator.geolocation) {
                alert('Этот браузер не поддерживает определение данных о местоположении!');
                dispatch('isWeatherLoadedAction');
                dispatch('errorGettingWeatherAction', 'Этот браузер не поддерживает определение данных о местоположении!');
            } else {
                navigator.geolocation.getCurrentPosition(success, error, options); //* - Подробнее на сайте "https://developer.mozilla.org/ru/docs/Web/API/Geolocation_API/Using_the_Geolocation_API".
            }
        },
        async getCoordsByCityName({state, commit, getters, dispatch}) {
            dispatch('isWeatherNotLoadedAction');
            dispatch('errorGettingWeatherAction', false);

            try {
                const cityCoords = await axios.get(getters.getUrlForCoordsByCityName);
                if (cityCoords.status === 200) {
                    commit('setCoordLat', cityCoords?.data[0]?.lat);
                    commit('setCoordLon', cityCoords?.data[0]?.lon);

                    const city = cityCoords?.data[0]?.local_names[state.language] || cityCoords?.data[0]?.local_names['en'];

                    if (!city) {
                        throw {message: 'Город не найден!'}
                    }

                    commit('setCityNameInTitle', city);
                    commit('setCityNameForLocalStorage', city);

                    localStorage.setItem('byCoords', JSON.stringify(false));

                    await dispatch('getWeather');
                } else {
                    throw {message: 'Нет данных!'}
                }
            } catch(error) {
                alert(`${error.message}`);
                dispatch('isWeatherLoadedAction');
                dispatch('errorGettingWeatherAction', `${error.message}`);
            }
        },
        async getWeather({state, commit, getters, dispatch}) {
            try {
                if (state.coordLat && state.coordLon) {
                    const resWeatherCurrent = await axios.get(getters.getUrlForWeatherCurrentByCoords);
                    commit('setWeatherInfo', resWeatherCurrent.data)
    
                    const resWeatherOnFiveDays = await axios.get(getters.getUrlForWeatherOnFiveDaysByCoords);
                    commit('setWeatherOnFiveDays', resWeatherOnFiveDays.data);

                    const currentAirPollutionData = await axios.get(getters.getUrlForCurrentAirPollutionData);
                    commit('setCurrentAirPollutionData', currentAirPollutionData.data);

                    const airPollutionDataForecast = await axios.get(getters.getUrlForAirPollutionDataForecast);
                    commit('setAirPollutionDataForecast', airPollutionDataForecast.data);
                } else {
                    throw {message: 'Координаты не найдены!'}
                }

                localStorage.setItem('location', JSON.stringify(state.cityNameForLocalStorage));

                commit('setCityNameInFormInput', '');
                commit('setCityName', '');
                commit('setCoordLat', '');
                commit('setCoordLon', '');
            } catch(error) {
                alert(`${error.message}`);
                dispatch('errorGettingWeatherAction', `${error.message}`);
            } finally {
                dispatch('isWeatherLoadedAction');
                dispatch('errorGettingWeatherAction', false);
            }
        },
        isWeatherNotLoadedAction({commit}) {
            commit('setIsWeatherLoaded', false);
        },
        isWeatherLoadedAction({commit}) {
            commit('setIsWeatherLoaded', true);
        },
        errorGettingWeatherAction({commit}, errorGettingWeather) {
            commit('setErrorGettingWeather', errorGettingWeather);
        },
    },
};
