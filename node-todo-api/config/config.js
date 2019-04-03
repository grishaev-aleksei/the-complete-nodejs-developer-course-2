const env = process.env.NODE_ENV || 'development';
//     () => {
//     if (process.env.ATLAS_DB_LOGIN) {
//         process.env.NODE_ENV = 'production'
//     }
//     return process.env.NODE_ENV || 'development';
// };
console.log('env ===', env);

if (env === 'development' || env === 'test') {
    const config = require('./config.json');
    const envConfig = config[env];

    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key]
    });
}
