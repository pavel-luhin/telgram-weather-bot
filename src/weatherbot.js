const propertiesReader = require('properties-reader');
const TelegramBot = require('node-telegram-bot-api');

let properties = propertiesReader('./config.properties');
const apiToken = process.env.TELEGRAM_TOKEN || properties.get('telegram.api.token');

const bot = new TelegramBot(apiToken, {polling: true});

bot.onText(/\/start/, (msg, match) => {
	let chatId = msg.chat.id;

	var options = {
		reply_markup: JSON.stringify({
			inline_keyboard: [
			[{ text: 'Minsk', callback_data: '1' }],
			[{ text: 'Moscow', callback_data: '2' }]
			]
		})
	};

	bot.sendMessage(chatId, 'kek',options).then(function (response) {
		console.out(response);
	});
});

//load bot modules
const echoModule = require('./module/echo')(bot);