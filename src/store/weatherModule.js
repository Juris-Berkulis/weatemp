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
        apiKey: 'f4adc48f5c500c2934f9ebd23672b601',
        units: 'metric',
        language: 'ru',
        citiesCountLimit: 1,
        coordLat: '',
        coordLon: '',
        cityNameInTitle: '',
    }),
    getters: {
        getUrlForWeatherCurrentByCityName(state) {
            return `https://api.openweathermap.org/data/2.5/weather?q=${state.cityName}&appid=${state.apiKey}&units=${state.units}&lang=${state.language}`
        },
        getUrlForWeatherOnFiveDaysByCityName(state) {
            return `https://api.openweathermap.org/data/2.5/forecast?q=${state.cityName}&appid=${state.apiKey}&units=${state.units}&lang=${state.language}`
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
            const title = 'Направление ветра';
            const degry = state.weather.wind.deg;
            const direction = getWindDirectionFunc(degry, false);

            const testimony = ` ${direction} (${degry}°)`;

            const units = '';
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
                getters.getMinTemperature,
                getters.getMaxTemperature,
                getters.getVisibility,
                getters.getCloudsPercent,
                getters.getDescription,
                getters.getWindDirection,
                getters.getWindSpeed,
                getters.getWindGusts,
                getters.getPressure,
                getters.getHumidity,
                getters.getSunrise,
                getters.getSunset,
            ]
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
        setCoordLat(state, coordLat) {
            state.coordLat = coordLat;
        },
        setCoordLon(state, coordLon) {
            state.coordLon = coordLon;
        },
        setCityNameInTitle(state, cityNameInTitle) {
            state.cityNameInTitle = cityNameInTitle;
        },
    },
    actions: {
        async getWeather({state, commit, getters}) {
            try {
                const cityCoords = await axios.get(getters.getUrlForCoordsByCityName);
                if (cityCoords.status === 200) {
                    console.log(cityCoords.data[0])
                    commit('setCoordLat', cityCoords.data[0].lat);
                    commit('setCoordLon', cityCoords.data[0].lon);

                    commit('setCityNameInTitle', cityCoords.data[0].local_names[state.language] || cityCoords.data[0].local_names['en'] || state.cityName);

                    const resWeatherCurrent = await axios.get(getters.getUrlForWeatherCurrentByCoords);
                    commit('setWeatherInfo', resWeatherCurrent.data)
    
                    const resWeatherOnFiveDays = await axios.get(getters.getUrlForWeatherOnFiveDaysByCoords);
                    commit('setWeatherOnFiveDays', resWeatherOnFiveDays.data);

                    const currentAirPollutionData = await axios.get(getters.getUrlForCurrentAirPollutionData);
                    commit('setCurrentAirPollutionData', currentAirPollutionData.data);
                    console.log(state.currentAirPollutionData)

                    const airPollutionDataForecast = await axios.get(getters.getUrlForAirPollutionDataForecast);
                    commit('setAirPollutionDataForecast', airPollutionDataForecast.data);
                    console.log(state.airPollutionDataForecast)
                } else {
                    throw {code: 404, message: 'Нет данных!'}
                }

                commit('setCityName', '');
            } catch(error) {
                alert(`${error.code}: ${error.message}`);
            }
        },
    },
};
