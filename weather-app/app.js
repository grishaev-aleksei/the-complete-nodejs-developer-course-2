const request = require('request');

const url = 'https://geocode-maps.yandex.ru/1.x/?apikey=2af3249c-1179-4964-9ad3-94ed8449dc34&format=json&geocode=moscow+novosibirskaya+8+23';

request(url, {json: true}, (error, response, body) => {
    if (error) {
        console.log(error)
    } else {
        const obj = body.response.GeoObjectCollection.featureMember[0].GeoObject;
        const formattedAddress = obj.metaDataProperty.GeocoderMetaData.Address.formatted;
        const position = obj.Point;
        console.log('Address:', formattedAddress);
        console.log(position);
        // console.log(JSON.stringify(obj, undefined, 2))
    }
});