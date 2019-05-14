const axios = require('axios').default;

const getCountryInfo = async () => {

    return axios.get('https://restcountries.eu/rest/v2/currency/rub', {
        params: {}
    })

};

const getExchangeRate = async (from, to) => {
    try {

        const response = await axios.get('http://data.fixer.io/api/latest', {
            params: {
                access_key: '0eeab9dcdca06989f8ab44e06e8d0784',
                base: 'EUR',
                symbols: to,
            }
        });
        const rate = response.data.rates[to];
        if (rate) {
            return rate
        } else {
            throw new Error();
        }
    } catch (e) {
        throw new Error(`unable to get exchange rate for ${from} and ${to}`)
    }


};

const getCountries = async (currencyCode) => {

    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
        return response.data.map(country => country.name)
    } catch (e) {
        throw new Error(`unable to get countries that use ${currencyCode}`)
    }

};

const convertCurrency = (from, to, amount) => {
    let countries;
    return getCountries(to)
        .then(tempCountries => {
            countries = tempCountries;
            return getExchangeRate(from, to)
                .then(rate => {
                    const exchangeAmount = amount * rate;
                    return `${amount} EUR is worth ${exchangeAmount} ${to}. ${to} can be used in the following countries: 
${countries.join(', ')}`
                })
        })
};

const convertCurrencyAlt = async (from, to, amount) => {
    const countries = await getCountries(to);
    const rate = await getExchangeRate(from, to);
    const exchangeAmount = amount * rate;
    return `${amount} EUR is worth ${exchangeAmount} ${to}. ${to} can be used in the following countries:
${countries.join(', ')}`
};

// getExchangeRate('USD', 'CAD')
//     .then(res => console.log(res));

// getCountries('USD')
//     .then(res => console.log(res));

// convertCurrency('EUR', 'GEL', 150)
//     .then(res => console.log(res))
//     .catch(err => console.log(err));

convertCurrencyAlt('USD', 'USD', 150)
    .then(res => console.log(res))
    .catch(err => console.log(err));
