require('dotenv').config();
const mongoose = require('mongoose');

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const connectionUrl = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@minhas-compras-db.ybicetd.mongodb.net/minhas-compras-db?retryWrites=true&w=majority`;

const connection = mongoose
    .connect(connectionUrl, connectionParams)
    .then(function () {
        console.info('Connected to MongoDB server');
    })
    .catch(function (error) {
        console.warn('Error connecting to MongoDB server', error);
    });

module.exports = connection;