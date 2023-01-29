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
	async getGenderUsers(gender){
		let genderUsers = await UsersService.getGenderUsers(gender)
		return genderUsers
	}
	async postUser(data){
		let createUser = await UsersService.postUsers(data)
		return createUser
	}
	async putUser(data, id){
		let createUser = await UsersService.putUsers(data, id)
		return createUser
	}
	async editUser(data){
		let putUser = await UsersService.patchUser(data)
		return putUser
	}
	async deleteUser(id){
		let deleteUser = await UsersService.deleteUser(id)
		return deleteUser
	}
}
module.exports = new UserControllers()