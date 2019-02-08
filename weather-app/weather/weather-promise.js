const request = require('request');
const axios = require('axios').default;

function getWeather(weatherApiKey, position) {
    const url = `https://api.weather.yandex.ru/v1/forecast?lat=${position.lat}&lon=${position.lon}&lang=en_US&limit=1&hours=false&extra=false`;
    return axios.get(url, {
        headers: {
            'X-Yandex-API-Key': weatherApiKey
        }
    })
        .then((response) => {
                return {
                    temp: response.data.fact.temp,
                    feelTemp: response.data.fact.feels_like
                }
            }
        )
        .catch((e) => {
            throw e.message
        })
}

module.exports = {
    getWeather
};