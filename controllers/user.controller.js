const UsersService = require('../services/user.services')


class UserControllers {
	async getUsers(){
		let users = await UsersService.getUsers()
		return users
	}
	async getUsersBuId(id){
		let user = await UsersService.getUsersBuId(id)
		return user
	}
}
module.exports = new UserControllers()