const request = require('request');

const address = 'osennyaya 23';
const geocodeApiKey = '2af3249c-1179-4964-9ad3-94ed8449dc34';

function wrapRequest(address) {
    return new Promise((resolve, reject) => {
        const url = `https://geocode-maps.yandex.ru/1.x/?apikey=${geocodeApiKey}&format=json&geocode=${address}`;
        request(url, {json: true}, (error, response, body) => {
            if (error) {
                reject('there was an error')
            } else if (body.error) {
                reject(body.error)
            } else if (body.response.GeoObjectCollection.featureMember.length === 0) {
                reject('not found')
            } else if (body.response.GeoObjectCollection.featureMember.length > 0) {
                const obj = body.response.GeoObjectCollection.featureMember[0].GeoObject;
                const formattedAddress = obj.metaDataProperty.GeocoderMetaData.Address.formatted;
                const position = obj.Point.pos;
                const lat = position.split(' ')[1];
                const lon = position.split(' ')[0];
                resolve({
                    address: formattedAddress,
                    lat,
                    lon
                });

            }
        });
    })
}
wrapRequest(address).then(result => console.log(result)).catch(e => console.log(e));