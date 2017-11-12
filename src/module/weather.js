//Weather module responses user with current weather for his city
module.exports = function (bot) {
	bot.onText(/\/setloc (.+)/, (msg, match) => {
		console.log(match[0], match[1]);
	})
}