const mongoose = require('mongoose');

ConnectDB = async () => {
    try {
        let uri = 'mongodb://hoangdo:hoangdo@localhost:27017/MongoDB';
        let options = {
            connectTimeoutMS: 3000,
            useNewUrlParser: true,
            useCreateIndex: true
        }
        await mongoose.connect(uri, options);
        console.log('Connecting...');
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

ConnectDB();
module.exports = {mongoose};