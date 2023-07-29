import {
    getCapitalizedString,
} from "./helperApp";

export const getWindDirectionFunc = (degry, isShort) => {
    if (degry === undefined) {
        return 'н/д'
    }

    let direction;

    if (degry >= 337.5 || degry < 22.5) {
        direction = 'Северный'; 
    } else if (degry < 67.5) {
        direction = 'Северо-Восточный';
    } else if (degry < 112.5) {
        direction = 'Восточный';
    } else if (degry < 157.5) {
        direction = 'Юго-Восточный';
    } else if (degry < 202.5) {
        direction = 'Южный';
    } else if (degry < 247.5) {
        direction = 'Юго-Западный';
    } else if (degry < 292.5) {
        direction = 'Западный';
    } else if (degry < 337.5) {
        direction = 'Северо-Западный';
    } else {
        direction = '???';
    }

    if (isShort) {
        if (direction.includes('?')) {
            return direction
        } else {
            const arr = direction.split('-');
            if (arr.length < 2) {
                return arr[0][0];
            } else {
                return `${arr[0][0]}${arr[1][0]}`
            }
        }
    }

    return direction
};

export const getWeatherIcon = (weatherObj) => {
    const weatherConditionGroupCode = +(weatherObj.weather[0].id.toString()[0]);
    const clouds = weatherObj.clouds.all;
    const timesOfDay = weatherObj.weather[0].icon[2];

    let icon;

    switch (weatherConditionGroupCode) {
        case 3: //* - Морось.
        case 5: { //* - Дождь.
            if (clouds > 90) {
                icon = `09${timesOfDay}`;
            } else {
                icon = `10${timesOfDay}`;
            }
            break;
        }
        case 8: { //* - Облака.
            if (clouds > 95) {
                icon = `04${timesOfDay}`;
            } else if (clouds > 90) {
                icon = `03${timesOfDay}`;
            } else if (clouds > 10) {
                icon = `02${timesOfDay}`;
            } else {
                icon = `01${timesOfDay}`;
            }
            break;
        }
        case 2: //* - Гроза.
        case 6: //* - Снег.
        case 7: //* - Туман.
        default: {
            icon = weatherObj.weather[0].icon; break;
        }
    }

    const imgSrc = `https://openweathermap.org/img/w/${icon}.png`;
    const imgAlt = getCapitalizedString(weatherObj.weather[0].description);

    return {imgSrc, imgAlt}
};
