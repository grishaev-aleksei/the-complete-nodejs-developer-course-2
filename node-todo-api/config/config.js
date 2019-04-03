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


// if (env() === "development") {
//     process.env.PORT = 3000;
//     process.env.MONGODB_URI = 'mongodb://localhost:27017/Todo-app';
// } else if (env() === 'test') {
//     process.env.PORT = 3000;
//     process.env.MONGODB_URI = 'mongodb://localhost:27017/Todo-app-test';
// } else if (env() === 'production') {
//     process.env.MOBGODB_URI =
//         `mongodb+srv://dbUser:LGAa5Qmf5ctltlbf@cluster0-8jidn.mongodb.net/test?retryWrites=true`;
// }
