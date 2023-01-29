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
		return new Promise((res, rej) => {
				res(users)
			}
		)
	}
	getUsersById(id){
		return new Promise( (res, rej) => {
			res(users.find( i => i.id == id ))
		})
	}
	getGenderUsers(gender){
		return new Promise( (res, rej) => {
			//  switch(gender){
			// 	case 'male' :
			// 		 return res(users.filter( i => i.isMan))
			// 	break
			// 	case 'female' :
			// 		 return res(users.filter( i => !i.isMan))
			// 	break
			// }
			if ( gender == "male" ) res( users.filter( i => i.isMan))
			if ( gender == "female" ) res( users.filter( i => !i.isMan))
		})
	}
	putUsers(data, id){
		return new Promise( (res,rej) => {
			const updateUsers = users.map( i => ( i.id == id ? data : i ))
			users.splice(0, users.length, ...updateUsers)
			res(users.filter( i => i.id == id))
		}) 
	}
	postUsers(data){
		return new Promise( (res,rej) => {
			users.push(data)
			// res.status(201)
			res(users.at(-1))
		}) 
	}
	patchUser(data){
		return new Promise( (res, rej) => {
			const id = data.id
			const updateUsers = users.filter( i => ( i.id == id ))
			const newUser = Object.assign(...updateUsers, data)
			res( newUser )
		})
	}
	deleteUser(id){
		return new Promise( (res, rej) => {
			const ids = users.findIndex( i => i.id == id)
			users.splice(ids, 1)
			res(`${id}`)
		})
	}
}

module.exports = new UsersService()