const MessageService = require('../services/message.services')


class MessageControllers {
	async getMessages(){
		let messages = await MessageService.getMessages()
		return messages
	}
	async getMessageById(id){
		let message = await MessageService.getMessageById(id)
		return message
	}
}
module.exports = new MessageControllers()