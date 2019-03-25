const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true,
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 5000,
};


mongoose.connect(process.env.MONGODB_URI, options)
    .then(res => console.log('successfully connected to database'))
    .catch(err => console.log('err', err));

mongoose.connection.on('disconnected', function(){
    console.log(("Mongoose default connection is disconnected"));
});


module.exports = {
    mongoose
};