const request = require('request');

function geocodeAddress(address, geocodeApiKey, callback) {
    const url = `https://geocode-maps.yandex.ru/1.x/?apikey=${geocodeApiKey}&format=json&geocode=${address}`;
    request(url, {json: true}, (error, response, body) => {
        if (error) {
            callback('there was an error')
        } else if (body.error) {
            callback(body.error)
        } else if (body.response.GeoObjectCollection.featureMember.length === 0) {
            callback('not found')
        } else if (body.response.GeoObjectCollection.featureMember.length > 0) {

            const obj = body.response.GeoObjectCollection.featureMember[0].GeoObject;
            const formattedAddress = obj.metaDataProperty.GeocoderMetaData.Address.formatted;
            const position = obj.Point.pos;
            const lat = position.split(' ')[1];
            const lon = position.split(' ')[0];
            callback(undefined, {
                address: formattedAddress,
                lat,
                lon
            });

        }
    });
}

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
            callback(undefined, body)
        }
    })
}

module.exports = {
    geocodeAddress,
    getWeather
};