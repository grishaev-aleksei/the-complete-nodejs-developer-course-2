const request = require('request');

function getWeather(weatherApiKey, position, callback) {
    const url = `https://api.weather.yandex.ru/v1/forecast?lat=${position.lat}&lon=${position.lon}&lang=en_US&limit=1&hours=false&extra=false`;
    request(url, {
        json: true, headers: {
            'X-Yandex-API-Key': weatherApiKey
        }
    }, (error, response, body) => {
        if (error) {
            callback('there was an error')
        } else if (body.error) {
            callback(body.error)
        } else {
            callback(undefined, {
                temp: body.fact.temp,
                feelTemp: body.fact.feels_like
            })
        }
    })
}

module.exports = {
    getWeather
};