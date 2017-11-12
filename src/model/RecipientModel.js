let mongoose = require('mongoose');

let recipientSchema = new mongoose.Schema({
	firstName: 'string',
	lastName: 'string',
	username: 'string',
	telegramId: 'string',
	location: 'string',
	chatId: 'string'
});

recipientSchema.statics.findByChatId = async function (chatId) {
	return await this.findOne({chatId}).exec();
}

let Recipient = mongoose.model('Recipient', recipientSchema);

module.exports = Recipient;