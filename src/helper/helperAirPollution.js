export const airPollutionCategoryForDifferentSubstance = () => {
    const airPollutionCategoryForCO = (value) => {
        if (value <= 4400) {
            return 1
        } else if (value <= 9400) {
            return 2
        } else if (value <= 12400) {
            return 3
        } else if (value <= 15400) {
            return 4
        } else {
            return 5
        }
    };

    const airPollutionCategoryForO3 = (value) => {
        if (value <= 60) {
            return 1
        } else if (value <= 100) {
            return 2
        } else if (value <= 140) {
            return 3
        } else if (value <= 180) {
            return 4
        } else {
            return 5
        }
    };

    const airPollutionCategoryForNO2 = (value) => {
        if (value <= 40) {
            return 1
        } else if (value <= 70) {
            return 2
        } else if (value <= 150) {
            return 3
        } else if (value <= 200) {
            return 4
        } else {
            return 5
        }
    };

    const airPollutionCategoryForSO2 = (value) => {
        if (value <= 20) {
            return 1
        } else if (value <= 80) {
            return 2
        } else if (value <= 250) {
            return 3
        } else if (value <= 350) {
            return 4
        } else {
            return 5
        }
    };

    const airPollutionCategoryForPM2_5 = (value) => {
        if (value <= 10) {
            return 1
        } else if (value <= 25) {
            return 2
        } else if (value <= 50) {
            return 3
        } else if (value <= 75) {
            return 4
        } else {
            return 5
        }
    };

    const airPollutionCategoryForPM10 = (value) => {
        if (value <= 20) {
            return 1
        } else if (value <= 50) {
            return 2
        } else if (value <= 100) {
            return 3
        } else if (value <= 200) {
            return 4
        } else {
            return 5
        }
    };

    return {
        airPollutionCategoryForCO,
        airPollutionCategoryForO3,
        airPollutionCategoryForNO2,
        airPollutionCategoryForSO2,
        airPollutionCategoryForPM2_5,
        airPollutionCategoryForPM10,
    }
};
