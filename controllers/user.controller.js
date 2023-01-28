const UsersService = require('../services/user.services')


class UserControllers {
	async getUsers(){
		let users = await UsersService.getUsers()
		return users
	}
	async getUsersById(id){
		let user = await UsersService.getUsersById(id)
		return user
	}
}
module.exports = new UserControllers()