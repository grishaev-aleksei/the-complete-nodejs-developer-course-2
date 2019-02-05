const yargs = require('yargs');

const geocode = require('./geocode/geocode');

const argv = yargs
    .options({
        a: {
            // demand: true,
            alias: 'address',
            describe: 'address to fetch weather for in en',
            string: true
        }, gkey: {
            // demand: true,
            describe: 'geocode api key ' +
                'https://developer.tech.yandex.ru/keys/',
            string: true
        }, wkey: {
            // demand: true,
            describe: 'weather api key ' +
                'https://developer.tech.yandex.ru/keys/',
            string: true
        }
    })
    .help()
    .alias('h', 'help')
    .argv;

const address = argv.a.replace(/\s/g, '+');
const geocodeApiKey = argv.gkey;
const weatherApiKey = argv.wkey;

geocode.geocodeAddress(address, geocodeApiKey, (error, result) => {
    if (error) {
        console.log('address', error)
    } else {
        geocode.getWeather(weatherApiKey, result, (error, response) => {
            if (error) {
                console.log('weather', error)
            } else {
                console.log(response.fact.temp)
            }
        });

    }
});