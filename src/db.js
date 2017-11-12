let mongoose = require('mongoose');

let host = process.env.DB_HOST || 'localhost';
let port = process.env.DB_PORT || 27017;
let name = process.env.DB_NAME || 'telegram-weather-data';
let username = process.env.DB_USERNAME || '';
let password = process.env.DB_PASSWORD || '';

var url = 'mongodb://' + username + ':' + password + '@' + host + ':' + port + '/' + name;
mongoose.connect(url);