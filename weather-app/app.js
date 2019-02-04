const yargs = require('yargs');

const geocode = require('./geocode/geocode');

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

const address = argv.a.replace(/\s/g, '+');

geocode.geocodeAddress(address, (error, result) => {
    if (error) {
        console.log(error)
    } else {
        console.log(result)
    }
});