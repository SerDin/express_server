const users = [ 
  { id: 1, name: 'Sergey', isMan: true , age: 31 },
  { id: 5, name: 'Julianna', isMan: false , age: 28 },
  { id: 4, name: 'Daniil', isMan: true , age: 1 },
  { id: 3, name: 'Pasha', isMan: true , age: 42 },
  { id: 2, name: 'Denis', isMan: true , age: 31 },
  { id: 6, name: 'Piter', isMan: true, age: 56},
  { id: 7, name: 'Ekaterina', isMan: false, age: 22},

]

class UsersService {
	getUsers(){
		const getUsers = new Promise((res, rej) => {
				res(users)
			}
		)
		return getUsers
	}
	getUsersBuId(id){
		return new Promise( (res, rej) => {
			return res(users.find( i => i.id == id ))
		})
	}
}

module.exports = new UsersService()