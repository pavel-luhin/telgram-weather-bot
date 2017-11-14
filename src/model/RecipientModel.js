let mongoose = require('mongoose');

let recipientSchema = new mongoose.Schema({
	firstName: 'string',
	lastName: 'string',
	username: 'string',
	chatId: 'string',
	language: 'string',
	latitude: 'number',
	longitude: 'number'
});

recipientSchema.statics.findByChatId = function (chatId) {
	return this.findOne({chatId}).exec();
}

let Recipient = mongoose.model('Recipient', recipientSchema);

module.exports = Recipient;