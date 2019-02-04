const request = require('request');

function geocodeAddress(address, callback) {
    const apiKey = '2af3249c-1179-4964-9ad3-94ed8449dc34';
    const url = `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&format=json&geocode=${address}`;
    request(url, {json: true}, (error, response, body) => {
        if (error || response.statusCode === 404) {
            callback('there was an error')
        } else if (body.response.GeoObjectCollection.featureMember.length === 0) {
            callback('not found')
        } else if (body.response.GeoObjectCollection.featureMember.length > 0) {

            const obj = body.response.GeoObjectCollection.featureMember[0].GeoObject;
            const formattedAddress = obj.metaDataProperty.GeocoderMetaData.Address.formatted;
            const position = obj.Point;
            callback(undefined, {
                address: formattedAddress,
                position
            });

        }
    });
}

module.exports = {
    geocodeAddress
};