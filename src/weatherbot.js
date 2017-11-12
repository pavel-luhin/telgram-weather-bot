require('./db');
const propertiesReader = require('properties-reader');
const TelegramBot = require('node-telegram-bot-api');
let Recipient = require('./model/RecipientModel');

let properties = propertiesReader('./config.properties');
const apiToken = process.env.TELEGRAM_TOKEN || properties.get('telegram.api.token');

const bot = new TelegramBot(apiToken, {polling: true});

bot.onText(/\/start/, (msg, match) => {
    let isNew = saveNewRecipient(msg.from, msg.chat);

    if (isNew) {
        bot.sendMessage(msg.chat.id, 'Welcome!');
    } else {
        bot.sendMessage(msg.chat.id, 'Bol already started!');
    }
});

function saveNewRecipient(from, chat) {
    let isNew = false;
    let recipient = Recipient.findByChatId(chat.id);

    if (!recipient) {
        isNew = true;
        recipient = new Recipient({
            firstName: from.first_name,
            lastName: from.last_name,
            username: from.username,
            chatId: chat.id
        });

        recipient.save();
    }

    return isNew;
}

//load bot modules
const echoModule = require('./module/echo')(bot);
const weatherModule = require('./module/weather')(bot);