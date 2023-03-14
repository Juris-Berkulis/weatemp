import axios from 'axios';

export const weatherModule = {
    namespaced: true,
    state: () => ({
        weather: null,
        weatherOnFiveDays: null,
        cityName: '',
        apiKey: 'f4adc48f5c500c2934f9ebd23672b601',
        units: 'metric',
        language: 'ru',
    }),
    getters: {
        getUrl(state) {
            return `https://api.openweathermap.org/data/2.5/weather?q=${state.cityName}&appid=${state.apiKey}&units=${state.units}&lang=${state.language}`
        },
        getUrlForWeatherOnFiveDays(state) {
            return `https://api.openweathermap.org/data/2.5/forecast?q=${state.cityName}&appid=${state.apiKey}&units=${state.units}&lang=${state.language}`
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
        getSet(state) {
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
            let direction;

            if (degry >= 337.5 || degry < 22.5) {
                direction = 'Северный'; 
            } else if (degry < 67.5) {
                direction = 'Северо-восточный';
            } else if (degry < 112.5) {
                direction = 'Восточный';
            } else if (degry < 157.5) {
                direction = 'Юго-восточный';
            } else if (degry < 202.5) {
                direction = 'Южный';
            } else if (degry < 247.5) {
                direction = 'Юго-западный';
            } else if (degry < 292.5) {
                direction = 'Западный';
            } else if (degry < 337.5) {
                direction = 'Северо-Западный';
            } else {
                direction = '???';
            }

            const testimony = `${direction} (${degry}°)`;

            const units = '';
            return {title, testimony, units}
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
                getters.getSet,
            ]
        },
    },
    mutations: {
        setWeatherInfo(state, weather) {
            state.weather = weather;
        },
        setWeatherOnFiveDays(state, weatherOnFiveDays) {
            state.weatherOnFiveDays = weatherOnFiveDays;
            console.log(state.weatherOnFiveDays)
        },
        setCityName(state, cityName) {
            state.cityName = cityName;
        },
    },
    actions: {
        async getWeather({state, commit, getters}) {
            try {
                const response = await axios.get(getters.getUrl);

                commit('setWeatherInfo', response.data)

                const resWeatherOnFiveDays = await axios.get(getters.getUrlForWeatherOnFiveDays);

                commit('setWeatherOnFiveDays', resWeatherOnFiveDays.data);

                state.cityName = '';
            } catch(error) {
                alert(`${error.code}: ${error.message}`);
            }
        },
    },
};
