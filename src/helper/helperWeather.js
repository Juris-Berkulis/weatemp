export const getWindDirectionFunc = (degry, isShort) => {
    if (degry === 'undefined') {
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
