const mongoose = require('mongoose');

const url = () =>{
    if (process.env.ATLAS_DB_LOGIN) {
        return `mongodb+srv://${process.env.ATLAS_DB_LOGIN}:${process.env.ATLAS_DB_PASS}@cluster0-8jidn.mongodb.net/test?retryWrites=true`
    }
    else return 'mongodb://localhost:27017/Todo-app'
};


mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true})
    .then(res => console.log('successfully connected'))
    .catch(err => console.log('err', err));

mongoose.connection.on('disconnected', function(){
    console.log(("Mongoose default connection is disconnected"));
});


module.exports = {
    mongoose
};