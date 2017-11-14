require('./db');
const propertiesReader = require('properties-reader');
let i18n = require('i18n');
const TelegramBot = require('node-telegram-bot-api');

let properties = propertiesReader('./config.properties');

i18n.configure({
    locales: ['en-US', 'ru-RU'],
    directory: __dirname + '/locales',
    defaultLocale: 'en-US',
    register: global
});

const apiToken = process.env.TELEGRAM_TOKEN || properties.get('telegram.api.token');

const bot = new TelegramBot(apiToken, {polling: true});

//load bot modules
const baseModule = require('./module/base')(bot);
const echoModule = require('./module/echo')(bot);
const weatherModule = require('./module/weather')(bot);