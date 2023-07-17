export const formatData = (numbers: object, format: boolean) => {
    function addCommas(number: string | number) {
        const parts = number.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
    }

    function formatNumber(number: number, format: boolean) {
        if (format) {
            if (number >= 1000000) {
                return addCommas((number / 1000000).toFixed(1)) + 'M';
            } else if (number >= 1000) {
                return addCommas((number / 1000).toFixed(0)) + 'k';
            }
        }

        const decimalPart =
            number % 1 !== 0 ? number.toFixed(3).split('.')[1] : '';
        const formattedNumber = decimalPart
            ? number.toFixed(3)
            : number.toFixed(0);
        return addCommas(formattedNumber);
    }

    let formattedData = null;

    if (numbers) {
        formattedData = {};

        Object.entries(numbers).forEach(([key, value]) => {
            if (typeof value === 'string' && value.includes('$')) {
                formattedData[key] = value; // Return the value as is if it contains "$"
            } else {
                const number = parseFloat(value as string);
                if (Number.isNaN(number)) {
                    formattedData[key] = value; // Return the value as is if it's not a number
                } else {
                    formattedData[key] = formatNumber(number, format);
                }
            }
        });
    }

    return formattedData;
};
