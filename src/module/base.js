//base module used to write new recipients to db and ask their location
let Recipient = require('../model/RecipientModel');
let i18n = require('i18n');

module.exports = (bot) => {
    bot.onText(/\/start/, (msg, match) => {
        getOrCreateRecipient(msg.from, msg.chat)
        .then(askLocation)
        .then(saveLocation);
    });

    function getOrCreateRecipient(from, chat) {
        return Recipient.findByChatId(chat.id).then((rec) => {
            if (!rec) {
                let recipient = new Recipient({
                    firstName: from.first_name,
                    lastName: from.last_name,
                    username: from.username,
                    chatId: chat.id,
                    language: from.language_code
                });

                recipient.save();
                return recipient;
            }
            return rec;
        });
    }

    function askLocation(recipient) {
        i18n.setLocale(recipient.language);

        let locationButton = {
            "parse_mode": "Markdown",
            "reply_markup": {
                "one_time_keyboard": true,
                "keyboard": [[{
                    text: i18n.__('share.location.button'),
                    request_location: true
                }], [i18n.__('cancel.button')]]
            }
        };

        bot.sendMessage(recipient.chatId, i18n.__('greetings', recipient.firstName), locationButton);
        return recipient;
    }

    function saveLocation(recipient) {
        bot.once('location', (msg) => {
            recipient.latitude = msg.location.latitude;
            recipient.longitude = msg.location.longitude;
            recipient.save();
        });
        return recipient;
    }
}