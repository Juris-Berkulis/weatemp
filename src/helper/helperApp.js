export const getCapitalizedString = (oldString) => {
    return oldString[0].toUpperCase() + oldString.slice(1).toLowerCase()
};

export const roundToTwoDecimalPlaces = (fullNumber) => {
    return fullNumber.toFixed(2)
};
