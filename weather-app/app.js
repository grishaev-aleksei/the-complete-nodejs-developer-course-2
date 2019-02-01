const request = require('request');
const yargs = require('yargs');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'address to fetch weather for in en',
            string: true
        }
    })
    .help()
    .alias('h', 'help')
    .argv;

const apiKey = '2af3249c-1179-4964-9ad3-94ed8449dc34';
const address = argv.a.replace(/\s/g, '+');
const url = `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&format=json&geocode=${address}`;

request(url, {json: true}, (error, response, body) => {
    if (error) {
        console.log(error)
    } else if (body.response.GeoObjectCollection.featureMember.length === 0) {
        console.log('not found')
    } else if (body.response.GeoObjectCollection.featureMember.length > 0) {
        const obj = body.response.GeoObjectCollection.featureMember[0].GeoObject;
        const formattedAddress = obj.metaDataProperty.GeocoderMetaData.Address.formatted;
        const position = obj.Point;
        console.log('Address:', formattedAddress);
        console.log(position);
    }
});