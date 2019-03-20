const mongoose = require('mongoose');


mongoose.connect(process.env.MOBGODB_URI, {useNewUrlParser: true})
    .then(res => console.log('successfully connected to database'))
    .catch(err => console.log('err', err));

mongoose.connection.on('disconnected', function(){
    console.log(("Mongoose default connection is disconnected"));
});


module.exports = {
    mongoose
};