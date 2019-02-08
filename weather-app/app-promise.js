const yargs = require('yargs');

const geocode = require('./geocode/geocode-promise');
const weather = require('./weather/weather-promise');

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

geocode.geocodeAddress(address, geocodeApiKey)
    .then((result) => {
        weather.getWeather(weatherApiKey, result)
            .then((result) => {
                console.log(result)
            })
            .catch((e)=>{
                console.log(e)
            })
    })
    .catch((e) => {
        console.log(e)
    });