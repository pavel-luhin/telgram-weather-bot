// Echo module. Catches all /echo [whatever] messages, and sends [whatever] back to sender.
module.exports = (bot) => {
	bot.onText(/\/echo (.+)/, (msg, match) => {
		const chatId = msg.chat.id;
		const response = match[1];

		bot.sendMessage(chatId, response);
	});
}